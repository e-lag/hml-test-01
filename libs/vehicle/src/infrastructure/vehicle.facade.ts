import {
    CommandBus,
    EventBus,
    QueryBus,
} from '@nestjs/cqrs';
import { GetVehiclesQuery } from '../app-service/queries/get-vehicles';
import { Vehicle } from '../domain';
import {
    CreateNewVehicleCommand,
    GetVehicleQuery,
} from '../app-service';
import { Logger } from '@nestjs/common';

export const VEHICLE_FACADE_FACTORY = (commandBus: CommandBus, queryBus: QueryBus, eventBus: EventBus) =>
    new VehicleFacade(commandBus, queryBus, eventBus);

export class VehicleFacade {
    logger = new Logger(VehicleFacade.name);
    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus,
        // private eventBus: EventBus,
    ) {
    }

    public create(license: string, model: string): Promise<Vehicle> {
        return this.commandBus.execute(new CreateNewVehicleCommand(license, model));
    }

    public getVehicle(vehicleId: string): Promise<Vehicle> {
        return this.queryBus.execute(new GetVehicleQuery(vehicleId));
    }

    public allVehicles(): Promise<Vehicle[]> {
        this.logger.verbose('allVehicles');
        return this.queryBus.execute(new GetVehiclesQuery());
    }
}
