import {
    Controller,
    Get,
} from '@nestjs/common';
import { VehicleFacade } from '@app/vehicle/infrastructure/vehicle.facade';

@Controller('vehicles')
export class VehiclesController {
    constructor(private vehicleFacade: VehicleFacade) {
    }

    @Get()
    list() {
        return this.vehicleFacade.allVehicles();
    }
}
