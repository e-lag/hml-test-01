import { Module } from '@nestjs/common';
import { DomainsModule } from './domains/domains.module';
import { RepositoryModule } from './repository/repository.module';
import { ControllerModule } from './controllers/controller.module';
import { AggregateModule } from './aggregates/aggregate.module';
import { ConfigModule } from '@nestjs/config';
import appConfigLoader from './configurations/app-config-loader';
import { ConfigurationsModule } from './configurations/configurations.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [ appConfigLoader ],
            isGlobal: true,
        }),
        ConfigurationsModule,
        RepositoryModule,
        AggregateModule,
        DomainsModule,
        ControllerModule,
    ],
})
export class ServerModule {
}
