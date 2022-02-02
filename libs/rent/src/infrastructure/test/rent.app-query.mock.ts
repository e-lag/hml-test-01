import { Vehicle } from '@app/vehicle';
import { RentAppQuery } from '@app/rent';

export class RentAppQueryMock extends RentAppQuery {
    async getVehicle(id: string): Promise<Vehicle> {
        return null;
    };

    async getVehicles(): Promise<Vehicle[]> {
        return null;
    };
}
