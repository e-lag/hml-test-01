import {
    IQueryHandler,
    QueryHandler,
} from '@nestjs/cqrs';
import { CalcRentPriceQuery } from './calc-rent-price.query';
import { Logger } from '@nestjs/common';
import { RentRepository } from '../../../infrastructure/rent.repository';
import { RentService } from '../../../infrastructure/rent.service';
import { RentConfigData } from '../../../infrastructure/rent-config.interface';

@QueryHandler(CalcRentPriceQuery)
export class CalcRentPriceQueryHandler implements IQueryHandler<CalcRentPriceQuery> {
    rentConfigData: RentConfigData;
    logger =new Logger(CalcRentPriceQueryHandler.name);
    constructor(rentRepository: RentRepository,
        private readonly rentService: RentService,
    ) {
        this.rentConfigData = this.rentService.config();
    }

    execute(query: CalcRentPriceQuery): Promise<number> {
        this.logger.debug({ query, rentConfigData: this.rentConfigData });
        const { days } = query;
        this.checkPeriodLength(days);
        const price = this.calcPrice(days);
        return Promise.resolve(price);
    }

    checkPeriodLength(days: number): void {
        const {
            min,
            max,
        } = this.rentConfigData.limits;
        if (days < min) {
            throw new Error(`Min period ${ min } days`);
        }
        if (days > max) {
            throw new Error(`Max period ${ max } days`);
        }
        return;
    }

    calcPrice(days: number): number {
        const {
            basePrice,
            discounts,
        } = this.rentConfigData;
        const discountDays = Object.keys(discounts);
        return days * basePrice - Array.from({ length: days })
            .map((price, idx) => discounts[
                discountDays
                    .filter(discountDay => parseInt(discountDay, 10) <= (idx + 1))
                    .map(dDisc => parseInt(dDisc, 10))
                    .sort((day1, day2) => day1 < day2 ? 1 : (day1 > day2 ? -1 : 0))?.[0]?.toString()] || 0)
            .reduce((totalDiscounts, dayDiscount) => totalDiscounts + dayDiscount * basePrice / 100, 0);
    }
}
