import { Rent } from '../domain';

export abstract class RentRepository {
    abstract getRent(id: string): Promise<Rent>;

    abstract getRentsOfPeriod(periodFrom: Date, periodTo: Date, vehicleId?: string): Promise<Rent[]>;

    abstract addRent(rent: Rent): Promise<Rent>;

    abstract setRent(rent: Rent): Promise<Rent>;

    // abstract getVehicle(vehicleId: string): Promise<Vehicle>
    //
    // abstract getVehicles(): Promise<Vehicle[]>
}
