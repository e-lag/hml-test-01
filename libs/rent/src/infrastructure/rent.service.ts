import {
    Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RentAppQuery } from '@app/rent/infrastructure/rent.app-query';
import { RentConfigData } from '@app/rent/infrastructure/rent-config.interface';

@Injectable()
export class RentService {
    private rentConfig: RentConfigData;
    constructor(
        // private readonly rentAppQuery: RentQueryAdapter,
        private configService: ConfigService,
        private rentAppQuery: RentAppQuery
    ) {
        //)
        this.rentConfig = configService.get<RentConfigData>('rent');
    }

    public config(): RentConfigData {
        return this.rentConfig;
    }

    public async getVehicle(vehicleId: string) {
        return this.rentAppQuery.getVehicle(vehicleId);
    }

    public async getVehicles() {
        return this.rentAppQuery.getVehicles();
    }
}
