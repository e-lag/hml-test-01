export class CreateNewVehicleCommand {
    constructor(
        public readonly license: string,
        public readonly model: string,
    ) {
    }
}
