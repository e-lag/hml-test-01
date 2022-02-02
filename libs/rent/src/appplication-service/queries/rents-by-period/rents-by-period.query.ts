export class RentsByPeriodQuery {
    constructor(
        public readonly periodBegin: Date,
        public readonly periodEnd: Date,
        public readonly vehicleId: string,
    ) {
    }
}
