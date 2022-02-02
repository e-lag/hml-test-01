export class CreateRentCommand {
    constructor(
        public readonly periodBegin: Date,
        public readonly periodEnd: Date,
        public readonly vehicle?: string,
    ) {
    }
}
