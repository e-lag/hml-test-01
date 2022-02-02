import {
    IQueryHandler,
    QueryHandler,
} from '@nestjs/cqrs';
import {
    GetVehiclesQuery,
} from './get-vehicles.query';
import { VehicleRepository } from '../../../infrastructure/vehicle.repository';
import { VehicleDomainService } from '../../../domain-service';
import { Vehicle } from '../../../domain';
import { Logger } from '@nestjs/common';

@QueryHandler(GetVehiclesQuery)
export class GetVehiclesQueryHandler implements IQueryHandler<GetVehiclesQuery> {
    logger = new Logger(GetVehiclesQuery.name);

    constructor(
        private repository: VehicleRepository,
    ) {
    }

    async execute(): Promise<Vehicle[]> {
        return (await this.repository.findAll()).map(vehicle => new VehicleDomainService(vehicle));
    }
}
