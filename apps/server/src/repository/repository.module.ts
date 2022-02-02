import {
    Global,
    Module,
} from '@nestjs/common';
import { VehicleRepositoryAdapter } from './vehicle-repository/vehicle-repository.adapter';
import { RepositoryService } from './repository.service';
import { RentRepositoryAdapter } from './rent-repository/rent-repository.adapter';

const REPOSITORY_ADAPTERS = [
    RepositoryService,
    VehicleRepositoryAdapter,
    RentRepositoryAdapter,
];

@Global()
@Module({
    exports: [ ...REPOSITORY_ADAPTERS ],
    providers: [
        ...REPOSITORY_ADAPTERS,
    ],
})
export class RepositoryModule {
}
