import {
    CommandBus,
    EventBus,
    QueryBus,
} from '@nestjs/cqrs';
import { Rent } from '@app/rent/domain';
import {
    CreateRentCommand,
    RentsByPeriodQuery,
} from '@app/rent/appplication-service';
import { CheckAvailableRentQuery } from '@app/rent/appplication-service/queries/check-available-rent';
// import { CheckAvailableRentQuery } from '@app/rent/appplication-service/queries/check-available-rent';

export const RENT_FACADE_FACTORY = (commandBus: CommandBus, queryBus: QueryBus, eventBus: EventBus) =>
    new RentFacade(commandBus, queryBus, eventBus);

export class RentFacade {
    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus,
        private eventBus: EventBus,
    ) {
    }

    create(periodFrom: Date, periodEnd: Date, vehicleId?: string) {
        return this.commandBus.execute(new CreateRentCommand(periodFrom, periodEnd, vehicleId));
    }

    statisticGet(periodFrom: Date, periodEnd: Date, vehicleId?: string) {
        return {
            periodFrom,
            periodEnd,
            vehicleId,
            report:[],
        };
    }

    async rents(periodFrom: Date, periodEnd: Date, vehicleId?: string): Promise<Rent[]> {
        return this.queryBus.execute(new RentsByPeriodQuery(periodFrom, periodEnd, vehicleId));
    }

    async rentsAvailable(periodFrom: Date, periodEnd: Date, vehicleId?: string): Promise<Rent> {
        return this.queryBus.execute(new CheckAvailableRentQuery(periodFrom, periodEnd, vehicleId));
    }
}
