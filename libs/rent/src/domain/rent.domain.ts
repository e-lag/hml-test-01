import { Vehicle } from '@app/vehicle';

export interface Rent {
    id: string;
    vehicle: Vehicle;
    startDate: Date;
    endDate: Date;
    days: number;
    price: number;
}
