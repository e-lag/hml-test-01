import {
    PipeTransform,
    Injectable,
    ArgumentMetadata,
    BadRequestException,
    Logger,
} from '@nestjs/common';

@Injectable()
export class DatePipe implements PipeTransform {
    logger = new Logger(DatePipe.name);

    transform(value: string, metadata: ArgumentMetadata): Date {
        const datePattern = new RegExp('^(((19|20)([2468][048]|[13579][26]|0[48])|2000)[\\-]02[\\-]29|((19|20)[0-9]{2}[\\-](0[4678]|1[02])[\\-](0[1-9]|[12][0-9]|30)|(19|20)[0-9]{2}[\\-](0[1359]|11)[\\-](0[1-9]|[12][0-9`]|3[01])|(19|20)[0-9]{2}[\\-]02[\\-](0[1-9]|1[0-9]|2[0-8])))$', 'gi');
        if (!datePattern.test(value)) {
            throw new BadRequestException('Date format failed for ' + value);
        }
        const mDate = new Date(value); // moment(value, 'YYYY-MM-DD').utcOffset(180);
        return mDate;
    }
}
