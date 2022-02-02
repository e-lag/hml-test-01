import {
    Global,
    Module,
} from '@nestjs/common';
import { RentQueryAdapter } from '../aggregates/rent/rent.query-adapter';
import { RentRepositoryAdapter } from '../repository/rent-repository/rent-repository.adapter';
import { RentModule } from '@app/rent';
import { VehicleRepositoryAdapter } from '../repository/vehicle-repository/vehicle-repository.adapter';
import { VehicleDomainModule } from '@app/vehicle/infrastructure/vehicle.module';
import {
    ConfigService,
} from '@nestjs/config';
import { RentConfigData } from '@app/rent/infrastructure/rent-config.interface';
import {
    CqrsModule,
} from '@nestjs/cqrs';

@Global()
@Module({
    imports: [
        CqrsModule,
        VehicleDomainModule.forRoot({ repository: VehicleRepositoryAdapter }),
        RentModule.forRoot(
            {
                repository: RentRepositoryAdapter,
                appQuery: RentQueryAdapter,
            },
        ),
    ],
    providers: [
        {
            provide: RentConfigData,
            useValue: (configService: ConfigService) => configService.get('rent'),
            inject: [ ConfigService ],
        },
    ],
    exports: [
        VehicleDomainModule,
        RentModule,
    ],
})
export class DomainsModule {
}
