import { RENT_COMMAND_HANDLERS } from './commands';
import { RENT_EVENT_HANDLERS } from './events';
import { RENT_QUERY_HANDLERS } from './queries';

export const DOMAIN_CQRS_HANDLERS = [
    ...RENT_EVENT_HANDLERS,
    ...RENT_QUERY_HANDLERS,
    ...RENT_COMMAND_HANDLERS,
];
