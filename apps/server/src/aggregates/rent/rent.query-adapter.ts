import { Injectable } from '@nestjs/common';
import { Vehicle } from '@app/vehicle/domain/vehicle.domain';
import { VehicleFacade } from '@app/vehicle/infrastructure/vehicle.facade';
import { RentAppQuery } from '@app/rent/infrastructure/rent.app-query';

@Injectable()
export class RentQueryAdapter implements RentAppQuery {
    constructor(
        private vehicles: VehicleFacade,
    ) {
    }

    async getVehicle(id: string): Promise<Vehicle> {
        return this.vehicles.getVehicle(id);
    }

    async getVehicles(): Promise<Vehicle[]> {
        return this.vehicles.allVehicles();
    }
}
