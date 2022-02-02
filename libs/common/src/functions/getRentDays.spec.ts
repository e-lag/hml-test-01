import { getRentDays } from '@app/common';

describe('getRentDays', ()=>{
    it('getRentLength 10d', () => {
        const d1 = new Date('2021-10-11');
        const d2 = new Date('2021-10-21 01:22:11+0000');
        expect(getRentDays(d1, d2)).toBe(11);
    });
    it('getRentLength 1d', () => {
        const d1 = new Date('2021-10-11');
        const d2 = new Date('2021-10-12');
        expect(getRentDays(d1, d2)).toBe(1);
    });
    it('getRentLength 30d', () => {
        const d1 = new Date('2021-10-29');
        const d2 = new Date('2021-11-28');
        expect(getRentDays(d1, d2)).toBe(30);
    });
    it('getRentLength 30d', () => {
        const d1 = new Date('2021-11-01');
        const d2 = new Date('2021-11-31');
        expect(getRentDays(d1, d2)).toBe(30);
    });
});
