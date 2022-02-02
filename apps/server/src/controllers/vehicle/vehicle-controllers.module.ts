import { Module } from '@nestjs/common';
import { VehiclesController } from './vehicles.controller';
import { VehicleController } from './vehicle.controller';

@Module({
    imports: [],
    controllers: [
        VehiclesController,
        VehicleController,
    ],
})
export class VehicleControllersModule {
}
