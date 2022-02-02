import {
    CommandHandler,
    ICommandHandler,
    QueryBus,
} from '@nestjs/cqrs';
import { CreateRentCommand } from './create-rent.command';
import { Rent } from '../../../domain';
import { Logger } from '@nestjs/common';
import { CheckAvailableRentQuery } from '../../queries/check-available-rent';
import { RentRepository } from '../../../infrastructure/rent.repository';
// import { RentService } from '../../../infrastructure/rent.service';
// import { RentConfigData } from '../../../infrastructure/rent-config.interface';

@CommandHandler(CreateRentCommand)
export class CreateRentCommandHandler implements ICommandHandler<CreateRentCommand> {
    logger = new Logger(CreateRentCommandHandler.name);

    constructor(
        private readonly rentRepository: RentRepository,
        private readonly queryBus: QueryBus,
        // private readonly rentService: RentService,
        // private readonly rentConfig: RentConfigData,
    ) {
        // this.rentConfig = this.rentService.config();
    }

    async execute(command: CreateRentCommand): Promise<Rent> {
        const rent = await this.queryBus.execute(new CheckAvailableRentQuery(command.periodBegin, command.periodEnd, command.vehicle));
        await this.rentRepository.addRent(rent);
        return rent;
    }
}
