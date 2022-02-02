import { Vehicle } from '../domain';

export abstract class VehicleRepository {
    abstract findAll(): Promise<Vehicle[]>;

    abstract findOne(id: string): Promise<Vehicle>;

    abstract updateOne(vehicle: Vehicle): Promise<Vehicle>;

    abstract insertOne(vehicle: Vehicle): Promise<Vehicle>;

    abstract removeOne(id: string): Promise<Vehicle>;
}
