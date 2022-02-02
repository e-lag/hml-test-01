export class CalculateRentStatisticQuery {
    constructor(
        public readonly periodBegin: Date,
        public readonly periodEnd: Date,
    ) {
    }
}
