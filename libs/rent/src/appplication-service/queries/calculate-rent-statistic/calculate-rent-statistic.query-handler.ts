import {
    IQueryHandler,
    QueryHandler,
} from '@nestjs/cqrs';
import { CalculateRentStatisticQuery } from './calculate-rent-statistic.query';

@QueryHandler(CalculateRentStatisticQuery)
export class CalculateRentStatisticQueryHandler implements IQueryHandler<CalculateRentStatisticQuery> {
    constructor(
        // private rentRepository: RentRepository,
    ) {
    }

    async execute(query: CalculateRentStatisticQuery): Promise<string> {
        return '';
    }
}
