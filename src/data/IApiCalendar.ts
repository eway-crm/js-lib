import type { IApiItemBase } from './IApiItemBase';

export interface IApiCalendar extends IApiItemBase {
    Location: string | null;
    StartDate: string | null;
    EndDate: string | null;
    IsAllDayEvent: boolean | null;
    Note: string | null;
    BusyStatusEn: string | null;
    BusyStatus: number | null;
    GraphSensitivityId: number | null;
    GraphId: string | null;

    Companies_TaskParentGuid: string | null;
    Contacts_TaskParentGuid: string | null;
    Leads_TaskParentGuid: string | null;
    Projects_TaskParentGuid: string | null;
    Marketing_TaskParentGuid: string | null;
}
