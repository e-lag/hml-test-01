import { Module } from '@nestjs/common';
import {
    ConfigModule,
    ConfigService,
} from '@nestjs/config';
import { RentConfigData } from '@app/rent/infrastructure/rent-config.interface';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
    ],
    providers: [
        {
            provide: RentConfigData,
            useValue: (configService: ConfigService) => configService.get('rent'),
            inject: [ConfigService],
        },
    ],
})
export class ConfigurationsModule {
}
