import { RentModel } from '../repository/models/rent.model';
import { VEHICLES_SEED } from './vehicles.seed';

export const RENTS_SEED: RentModel[] = [
    {
        id: '95ab7c11-174a-4624-9ac3-389281e0d9ee',
        vehicle: VEHICLES_SEED[0],
        startDate: new Date('2021-10-01T00:00:00.000Z'),
        endDate: new Date('2021-10-06T00:00:00.000Z'),
        days: 5,
        price: 4950,
    },
    {
        id: 'f98a3f7f-3b56-4a26-9eed-d48711c2d5b2',
        vehicle: VEHICLES_SEED[0],
        startDate: new Date('2021-10-11T00:00:00.000Z'),
        endDate: new Date('2021-10-30T00:00:00.000Z'),
        days: 19,
        price: 17650,
    },
    {
        id: '6eb9e900-f439-4c3a-b37c-fd1057a96949',
        vehicle: VEHICLES_SEED[0],
        startDate: new Date('2021-11-03T00:00:00.000Z'),
        endDate: new Date('2021-12-02T00:00:00.000Z'),
        days: 29,
        price: 26150,
    },
    {
        id: 'faf5d499-48b8-46d7-a469-19f1445536c9',
        vehicle: VEHICLES_SEED[1],
        startDate: new Date('2021-10-11T00:00:00.000Z'),
        endDate: new Date('2021-10-11T00:00:00.000Z'),
        days: 1,
        price: 1000,
    },
    {
        id: 'e7527657-2d3d-4c52-989e-fdf9b9151bf2',
        vehicle: VEHICLES_SEED[1],
        startDate: new Date('2021-10-11T00:00:00.000Z'),
        endDate: new Date('2021-10-11T00:00:00.000Z'),
        days: 14,
        price: 13250,
    },
    {
        id: '0f2b99de-4c50-4fb6-a78d-f8c9f3ff6f29',
        vehicle: VEHICLES_SEED[2],
        startDate: new Date('2021-10-11T00:00:00.000Z'),
        endDate: new Date('2021-10-11T00:00:00.000Z'),
        days: 8,
        price: 7800,
    },
];
