export interface RentConfig {
    limits: {
        min: number;
        max: number;
    };
    allowWeekDays: number[];
    basePrice: number;
    offset: number;
    discounts: Record<string, number>;
}

export abstract class RentConfigData implements RentConfig {
    abstract limits: { min: number; max: number };
    abstract allowWeekDays: number[];
    abstract basePrice: number;
    abstract offset: number;
    abstract discounts: Record<string, number>;
}
