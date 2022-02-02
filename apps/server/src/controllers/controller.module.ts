import { Module } from '@nestjs/common';
import { VehicleControllersModule } from './vehicle/vehicle-controllers.module';
import { RentControllersModule } from './rent/rent-controllers.module';

@Module(
    {
        imports: [
            VehicleControllersModule,
            RentControllersModule,
        ],
        providers: [],
        exports: [],
    },
)
export class ControllerModule {
}
