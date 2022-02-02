import {
    Global,
    Module,
} from '@nestjs/common';
import { RentQueryAdapter } from './rent/rent.query-adapter';

@Global()
@Module({
    imports: [],
    providers: [ RentQueryAdapter ],
    exports: [ RentQueryAdapter ],
})
export class AggregateModule {
}
