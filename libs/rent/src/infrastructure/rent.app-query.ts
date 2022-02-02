import { Vehicle } from '@app/vehicle';

export abstract class RentAppQuery {
    abstract getVehicle(id: string): Promise<Vehicle>;

    abstract getVehicles(): Promise<Vehicle[]>;
}
