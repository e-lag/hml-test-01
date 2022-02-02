import {
    IQueryHandler,
    QueryHandler,
} from '@nestjs/cqrs';
import { RentsByPeriodQuery } from './rents-by-period.query';
import { Rent } from '../../../domain';
import { RentRepository } from '../../../infrastructure/rent.repository';

@QueryHandler(RentsByPeriodQuery)
export class RentsByPeriodQueryHandler implements IQueryHandler<RentsByPeriodQuery> {
    constructor(
        private rentRepository: RentRepository,
        // private appQuery: RentAppQuery,
    ) {
    }

    async execute(query: RentsByPeriodQuery): Promise<Rent[]> {
        return this.rentRepository.getRentsOfPeriod(query.periodBegin, query.periodEnd, query.vehicleId);
    }
}
