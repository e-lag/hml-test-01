import {
    DynamicModule,
    Module,
    OnModuleInit,
} from '@nestjs/common';
import {
    CommandBus,
    CqrsModule,
    EventBus,
    QueryBus,
} from '@nestjs/cqrs';
import { VehicleRepository } from './vehicle.repository';
import {
    VEHICLE_FACADE_FACTORY,
    VehicleFacade,
} from './vehicle.facade';
import {
    DOMAIN_CQRS_HANDLERS,
    VEHICLE_COMMAND_HANDLERS,
    VEHICLE_EVENT_HANDLERS,
    VEHICLE_QUERY_HANDLERS,
} from '../app-service';

interface VehicleModuleProviders {
    /** реализация репозитория */
    repository: new (...arr: unknown[]) => VehicleRepository;
}

@Module({})
export class VehicleDomainModule implements OnModuleInit {
    constructor(private queryBus: QueryBus, private commandBus: CommandBus, private eventBus: EventBus) {
    }

    static forRoot(providers: VehicleModuleProviders): DynamicModule {
        return {
            module: VehicleDomainModule,
            imports: [ CqrsModule ],
            providers: [
                {
                    provide: VehicleRepository,
                    useClass: providers.repository,
                },
                /** фасад бизнес правил */
                {
                    provide: VehicleFacade,
                    useFactory: VEHICLE_FACADE_FACTORY,
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
            exports: [
                VehicleFacade,
            ],
        };
    }

    onModuleInit(): void {
        this.commandBus.register(VEHICLE_COMMAND_HANDLERS);
        this.queryBus.register(VEHICLE_QUERY_HANDLERS);
        this.eventBus.register(VEHICLE_EVENT_HANDLERS);
    }
}
