import {
    Rent,
    RentRepository,
} from '@app/rent';

export class RentRepositoryMock extends RentRepository {
    async getRent(id: string): Promise<Rent> {
        return null;
    }
    async getRentsOfPeriod(periodFrom: Date, periodTo: Date): Promise<Rent[]> {
        return null;
    }
    async addRent(rent: Rent): Promise<Rent> {
        return null;
    }
    async setRent(rent: Rent): Promise<Rent> {
        return null;
    }
}
