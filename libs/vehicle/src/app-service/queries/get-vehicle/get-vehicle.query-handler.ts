import {
    IQueryHandler,
    QueryHandler,
} from '@nestjs/cqrs';
import { GetVehicleQuery } from './get-vehicle.query';
import { VehicleRepository } from '../../../infrastructure/vehicle.repository';
import { VehicleDomainService } from '../../../domain-service';

@QueryHandler(GetVehicleQuery)
export class GetVehicleQueryHandler implements IQueryHandler {
    constructor(
        private repository: VehicleRepository,
    ) {
    }

    async execute(query: GetVehicleQuery): Promise<VehicleDomainService> {
        const vehicleData = await this.repository.findOne(query.id);
        if (!vehicleData) {
            throw new Error('Vehicle not found');
        }
        return new VehicleDomainService(vehicleData);
    }
}
