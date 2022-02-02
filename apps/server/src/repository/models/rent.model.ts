import { VehicleModel } from './vehicle.model';

export interface RentModel{
    id: string;
    vehicle: VehicleModel;
    startDate: Date;
    endDate: Date;
    days: number;
    price: number;
}
