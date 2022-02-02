import {
    IQueryHandler,
    QueryBus,
    QueryHandler,
} from '@nestjs/cqrs';
import { CheckAvailableRentQuery } from './check-available-rent.query';
import { Rent } from '../../../domain';
import { getRentDays } from '../../../../../common/src';
import { CalcRentPriceQuery } from '../calc-rent-price';
import { RentDomainService } from '../../../domain-service';
import { RentRepository } from '../../../infrastructure/rent.repository';
import { RentAppQuery } from '../../../infrastructure/rent.app-query';
import { RentConfigData } from '../../../infrastructure/rent-config.interface';
import { Logger } from '@nestjs/common';

enum WeekDays {
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
}

@QueryHandler(CheckAvailableRentQuery)
export class CheckAvailableRentQueryHandler implements IQueryHandler<CheckAvailableRentQuery> {
    logger = new Logger(CheckAvailableRentQueryHandler.name);

    constructor(
        private readonly rentRepository: RentRepository,
        private readonly rentConfig: RentConfigData,
        private readonly appQuery: RentAppQuery,
        private readonly queryBus: QueryBus,
    ) {
        // this.rentConfig = this.rentService.config();
    }

    async execute(query: CheckAvailableRentQuery): Promise<Rent> {
        // return this.rentService.getVehicles();
        const {
            periodBegin,
            periodEnd,
            vehicleId,
        } = query;
        this.logger.debug({ query });
        const days = getRentDays(periodBegin, periodEnd);
        this.logger.debug({ days });
        this.checkDates(periodBegin, periodEnd);
        this.logger.debug({ periodBegin, periodEnd });
        const price = await this.queryBus.execute(new CalcRentPriceQuery(days));
        this.logger.debug({ price });

        const freeVehicles = (await this.freeVehicle(periodBegin, periodEnd, this.rentConfig.offset))
            .filter(fVehicle => !vehicleId ? true : vehicleId === fVehicle.id);
        this.logger.debug({ freeVehicles });
        if (freeVehicles.length === 0) {
            throw new Error('Not found free vehicles');
        }
        return new RentDomainService({
            id: null,
            startDate: periodBegin,
            endDate: periodEnd,
            price,
            vehicle: freeVehicles[0],
            days,
        });
    }

    async freeVehicle(periodFrom: Date, periodTo: Date, offset: number) {
        const checkPeriodFrom = new Date(periodFrom.valueOf());
        checkPeriodFrom.setDate(checkPeriodFrom.getDate() - offset);
        const checkPeriodTo = new Date(periodTo.valueOf());
        checkPeriodTo.setDate(checkPeriodTo.getDate() + offset);
        const rentVehicles = await this.rentRepository.getRentsOfPeriod(checkPeriodFrom, checkPeriodTo);
        const availableVehicles = await this.appQuery.getVehicles();
        return availableVehicles.filter(vehicle => !rentVehicles.map(rentVehicle => rentVehicle.vehicle.id).includes(vehicle.id));
    }

    private checkDates(periodBegin: Date, periodEnd: Date) {
        const allowWeekDays = this.rentConfig.allowWeekDays;
        this.logger.debug({ allowWeekDays, periodBegin, periodEnd, wd: allowWeekDays.map(wd=>WeekDays[wd]) });
        if (!allowWeekDays.includes(periodBegin.getDay())) {
            this.checkDatesErrMessage(periodBegin, 'start');
        }
        if (!allowWeekDays.includes(periodEnd.getDay())) {
            this.checkDatesErrMessage(periodEnd, 'end');
        }
        return;
    }

    private checkDatesErrMessage(errDate: Date, dType: 'start' | 'end') {
        throw new Error(`The rental ${ dType } date falls on ${ WeekDays[errDate.getDay()] } (${ errDate.toLocaleDateString('ru-RU') }).
    The rental can be started on the following days: ${ this.rentConfig.allowWeekDays.map(allowDay => WeekDays[allowDay]).join(', ') }`);
    }
}
