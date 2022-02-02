import { Vehicle } from '../domain';
import { assignDomainModel } from '@app/common';

export class VehicleDomainService implements Vehicle {
    constructor(vehicle: Vehicle) {
        assignDomainModel<Vehicle>(this, vehicle);
    }

    public id: string = null;
    public license: string = null;
    public model: string = null;
}
