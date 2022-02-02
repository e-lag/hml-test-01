import { VEHICLE_COMMAND_HANDLERS } from './commands';
import { VEHICLE_EVENT_HANDLERS } from './events';
import { VEHICLE_QUERY_HANDLERS } from './queries';

export const DOMAIN_CQRS_HANDLERS = [
    ...VEHICLE_COMMAND_HANDLERS,
    ...VEHICLE_EVENT_HANDLERS,
    ...VEHICLE_QUERY_HANDLERS,
];
