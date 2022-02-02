import { Module } from '@nestjs/common';
import { RentsController } from './rents.controller';

@Module({
    imports: [],
    controllers: [ RentsController ],
})
export class RentControllersModule {
}
