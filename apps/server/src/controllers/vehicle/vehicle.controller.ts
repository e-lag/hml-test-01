import {
    BadRequestException,
    Controller,
    Get,
    NotFoundException,
    Param,
    ParseUUIDPipe,
} from '@nestjs/common';
import { VehicleFacade } from '@app/vehicle/infrastructure/vehicle.facade';

@Controller('vehicle')
export class VehicleController {
    constructor(private vehicleFacade: VehicleFacade) {
    }

    @Get(':id')
    vehicle(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.vehicleFacade.getVehicle(id).catch((errorMsg: Error) => {
            if (errorMsg.message === 'Vehicle not found') {
                throw new NotFoundException('Vehicle not found');
            } else {
                throw new BadRequestException('Other error');
            }
        });
    }
}
