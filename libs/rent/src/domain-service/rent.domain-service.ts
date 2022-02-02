
import { Rent } from '../domain';
import { assignDomainModel } from '@app/common';
import { Vehicle } from '@app/vehicle';

export class RentDomainService implements Rent {
    constructor(rent: Rent) {
        assignDomainModel<Rent>(this, rent);
    }

    id: string = null;
    vehicle: Vehicle = null;
    startDate: Date = null;
    endDate: Date = null;
    days: number = null;
    price: number = null;
}
