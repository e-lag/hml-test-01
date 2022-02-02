import { CalcRentPriceQueryHandler } from './calc-rent-price.query-handler';
import { RentRepository } from '../../../infrastructure';
import { RentRepositoryMock } from '../../../infrastructure/test/rent-repository.mock';
import { RENT_CONFIG_TEST } from '../../../../test/rent-config-test.const';

describe('calcRentPrice', () => {
    let calcRentPriceQueryHandler: CalcRentPriceQueryHandler;
    let rentRepository: RentRepository;
    beforeEach(() => {
        rentRepository = new RentRepositoryMock();
        calcRentPriceQueryHandler =
            new CalcRentPriceQueryHandler(rentRepository, RENT_CONFIG_TEST);
    });
    it('price 2 days', async () => {
        expect(
            calcRentPriceQueryHandler.calcPrice(2),
        ).toBe(2000);
    });
    it('price 7 days', async () => {
        expect(
            calcRentPriceQueryHandler.calcPrice(7),
        ).toBe(6850);
    });
    it('price 14 days', async () => {
        expect(
            calcRentPriceQueryHandler.calcPrice(14),
        ).toBe(13250);
    });
    it('price 29 days', async () => {
        expect(
            calcRentPriceQueryHandler.calcPrice(29),
        ).toBe(26150);
    });
    it('price 0 days', async () => {
        expect(() => (calcRentPriceQueryHandler.checkPeriodLength(0)),
        ).toThrow('Min period 1 days');
    });
    it('price 30 days', () => {
        expect(
            () => (calcRentPriceQueryHandler.checkPeriodLength(30)),
        ).toThrow('Max period 29 days');
    });
});
