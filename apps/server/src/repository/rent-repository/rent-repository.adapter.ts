import {
    Injectable,
    Logger,
} from '@nestjs/common';
import {
    Rent,
} from '@app/rent';
import { RepositoryService } from '../repository.service';
import { RentRepository } from '@app/rent/infrastructure/rent.repository';

@Injectable()
export class RentRepositoryAdapter implements RentRepository {
    logger = new Logger(RepositoryService.name);
    constructor(private repositoryService: RepositoryService) {
    }

    async getRent(id: string): Promise<Rent> {
        return this.repositoryService.rents.filter(rent => rent.id === id)[0];
    }

    async getRentsOfPeriod(periodFrom: Date, periodTo: Date, vehicleId?: string): Promise<Rent[]> {
        return this.repositoryService.rents
            .filter(rent => !!vehicleId ? rent.vehicle.id === vehicleId : true)
            .filter(rent => rent.endDate > periodFrom && rent.startDate < periodTo);
    }

    async addRent(rent: Rent): Promise<Rent> {
        this.repositoryService.rents.push(rent);
        return rent;
    }

    async setRent(rent: Rent): Promise<Rent> {
        this.repositoryService.rents = [
            ...this.repositoryService.rents.map(rRent => {
                if (rRent.id === rent.id) {
                    return rent;
                } else {
                    return rRent;
                }
            }),
        ];
        return rent;
    }
}
