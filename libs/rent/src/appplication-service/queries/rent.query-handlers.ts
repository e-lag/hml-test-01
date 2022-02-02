import { CalculateRentStatisticQueryHandler } from './calculate-rent-statistic';
import { CalcRentPriceQueryHandler } from './calc-rent-price';
import { RentsByPeriodQueryHandler } from './rents-by-period';
import { CheckAvailableRentQueryHandler } from './check-available-rent';

export const RENT_QUERY_HANDLERS = [
    RentsByPeriodQueryHandler,
    CalculateRentStatisticQueryHandler,
    CalcRentPriceQueryHandler,
    CheckAvailableRentQueryHandler,
];
