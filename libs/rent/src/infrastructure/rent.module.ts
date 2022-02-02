import {
    DynamicModule,
    Logger,
    Module,
    OnModuleInit,
} from '@nestjs/common';
import {
    CommandBus,
    CqrsModule,
    EventBus,
    QueryBus,
} from '@nestjs/cqrs';
import {
    RENT_FACADE_FACTORY,
    RentFacade,
} from './rent.facade';
import {
    DOMAIN_CQRS_HANDLERS,
    RENT_COMMAND_HANDLERS,
    RENT_EVENT_HANDLERS,
    RENT_QUERY_HANDLERS,
} from '../appplication-service';
import {
    RentConfigData,
} from '@app/rent/infrastructure/rent-config.interface';
import {
    ConfigService,
} from '@nestjs/config';
import { RentService } from '@app/rent/infrastructure/rent.service';
import { RentRepository } from '@app/rent/infrastructure/rent.repository';
import { RentAppQuery } from '@app/rent/infrastructure/rent.app-query';

export const RENT_CONFIG_DATA = 'RENT_CONFIG_DATA';

interface RentModuleProviders {
    /** реализация репозитория */
    repository: new (...arg: unknown[]) => RentRepository;
    appQuery: new (...arg: unknown[]) => RentAppQuery;
}

@Module({})
export class RentModule implements OnModuleInit {
    logger = new Logger(RentModule.name);
    constructor(
        private queryBus: QueryBus,
        private commandBus: CommandBus,
        private eventBus: EventBus,
        // private rentConfigData: RentConfigData,
    ) {
    }

    static forRoot(providers: RentModuleProviders): DynamicModule {
        return {
            module: RentModule,
            imports: [
                // ConfigModule,
                CqrsModule,
            ],
            providers: [
                {
                    provide: RentRepository,
                    useClass: providers.repository,
                },
                {
                    provide: RentConfigData,
                    useFactory: (configService: ConfigService) => configService.get<RentConfigData>('rent'),
                    inject: [ ConfigService ],
                },
                {
                    provide: RentAppQuery,
                    useClass: providers.appQuery,
                },
                RentService,
                /** фасад бизнес правил */
                {
                    provide: RentFacade,
                    useFactory: RENT_FACADE_FACTORY,
                    inject: [
                        CommandBus,
                        QueryBus,
                        EventBus,
                    ],
                },
                CommandBus,
                QueryBus,
                EventBus,
                ...DOMAIN_CQRS_HANDLERS,
            ],
            exports: [ RentFacade ],
        };
    }

    onModuleInit(): void {
        this.commandBus.register(RENT_COMMAND_HANDLERS);
        this.queryBus.register(RENT_QUERY_HANDLERS);
        this.eventBus.register(RENT_EVENT_HANDLERS);
    }
}
