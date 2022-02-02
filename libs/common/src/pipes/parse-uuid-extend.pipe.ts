import {
    HttpStatus,
    Injectable,
    Optional,
    PipeTransform,
} from '@nestjs/common';
import {
    ErrorHttpStatusCode,
    HttpErrorByCode,
} from '@nestjs/common/utils/http-error-by-code.util';
import { isUUID } from '@nestjs/common/utils/is-uuid';

export interface ParseUUIDPipeOptions {
    version?: '3' | '4' | '5';
    optional?: boolean;
    errorHttpStatusCode?: ErrorHttpStatusCode;
    exceptionFactory?: (errors: string) => unknown;
}

@Injectable()
export class ParseUUIDExtendPipe implements PipeTransform<string> {
    private readonly version: '3' | '4' | '5';
    private readonly optional: boolean;
    protected exceptionFactory: (errors: string) => unknown;

    constructor(@Optional() options?: ParseUUIDPipeOptions) {
        options = options || {};
        const {
            exceptionFactory,
            errorHttpStatusCode = HttpStatus.BAD_REQUEST,
            version,
            optional,
        } = options;

        this.optional = optional;
        this.version = version;
        this.exceptionFactory =
            exceptionFactory ||
            (error => new HttpErrorByCode[errorHttpStatusCode](error));
    }
    async transform(value: string): Promise<string> {
        if (this.optional && !value) {
            return null;
        }
        if (!isUUID(value, this.version)) {
            throw this.exceptionFactory(
                `Validation failed (uuid ${
                    this.version ? 'v' + this.version : ''
                } is expected)`,
            );
        }
        return value;
    }
}
