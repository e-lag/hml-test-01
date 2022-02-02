import {
    CommandHandler,
    ICommandHandler,
} from '@nestjs/cqrs';
import { CreateNewVehicleCommand } from './create-new-vehicle.command';
import {
    VehicleRepository,
} from '../../../infrastructure/vehicle.repository';
import { VehicleDomainService } from '../../../domain-service';


@CommandHandler(CreateNewVehicleCommand)
export class CreateNewVehicleCommandHandler implements ICommandHandler<CreateNewVehicleCommand> {
    constructor(
        private readonly repository: VehicleRepository) {
    }

    async execute(command: CreateNewVehicleCommand) {
        return this.repository.insertOne(new VehicleDomainService({ ...command, id: null }));
    }
}
