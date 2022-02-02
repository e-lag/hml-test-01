import {
    Injectable,
    Logger,
    OnApplicationBootstrap,
} from '@nestjs/common';
import { RentModel } from './models/rent.model';
import { VehicleModel } from './models/vehicle.model';
import { VEHICLES_SEED } from '../seed/vehicles.seed';
import { RENTS_SEED } from '../seed/rents.seed';

@Injectable()
export class RepositoryService implements OnApplicationBootstrap {
    logger = new Logger(RepositoryService.name);
    public rents: RentModel[] = [];
    public vehicles: VehicleModel[] = [];

    onApplicationBootstrap(): void {
        this.vehicles = [ ...VEHICLES_SEED ];
        this.rents = [ ...RENTS_SEED ];
        this.logger.verbose('Seed complete');
    }
}
