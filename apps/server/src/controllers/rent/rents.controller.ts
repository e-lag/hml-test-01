import {
    BadRequestException,
    Controller,
    Get,
    Logger,
    Param,
    Post,
    Query,
} from '@nestjs/common';
import { RentFacade } from '@app/rent';
import {
    DatePipe,
    ParseUUIDExtendPipe,
} from '@app/common';

@Controller('rents')
export class RentsController {
    logger = new Logger(RentsController.name);

    constructor(private rentFacade: RentFacade) {
    }

    @Get(
        'available/:vehicle',
    )
    rentAvailable(@Query('from', DatePipe) fromDate: Date,
        @Query('to', DatePipe) toDate: Date,
        @Param('vehicle', new ParseUUIDExtendPipe({
            version: '4',
            optional: true,
        })) vehicleId: string) {
        return this.rentFacade.rentsAvailable(fromDate, toDate, vehicleId).catch((error: Error) => {
            throw new BadRequestException(error.message);
        });
    }
    @Get([
        ':vehicle',
        '',
    ])
    rents(@Query('from', DatePipe) fromDate: Date,
        @Query('to', DatePipe) toDate: Date,
        @Param('vehicle', new ParseUUIDExtendPipe({
            version: '4',
            optional: true,
        })) vehicleId: string) {
        return this.rentFacade.rents(fromDate, toDate, vehicleId).catch((error: Error) => {
            throw new BadRequestException(error.message);
        });
    }

    @Post(':vehicle?')
    create(@Query('from', DatePipe) fromDate: Date,
        @Query('to', DatePipe) toDate: Date,
        @Param('vehicle', new ParseUUIDExtendPipe({
            version: '4',
            optional: true,
        })) vehicleId: string) {
        return this.rentFacade.create(fromDate, toDate, vehicleId).catch((error: Error) => {
            throw new BadRequestException(error.message);
        });
    }
}
