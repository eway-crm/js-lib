import { IApiAvailableBundle } from "./IApiAvailableBundle";

export interface IApiCapacityAvailableBundle extends IApiAvailableBundle {
    FreeSlotsCount: number;
    UsedSlotsCount: number;
}