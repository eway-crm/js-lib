import { IApiItemBase } from './IApiItemBase';
import { IApiEvent } from './workflowActions/IApiAction';

export interface IApiWorkflowActionDerivedItem extends IApiItemBase {
    PerformsLockItemAction: boolean | null;
    PerformsAreEqualAction: boolean | null;
    PerformsCheckRelationPresenceAction: boolean | null;
    PerformsWriteJournalAction: boolean | null;
    PerformsSetOwnerAction: boolean | null;
    PerformsSetFieldValueAction: boolean | null;
    PerformsCreateTaskAction: boolean | null;
    PerformsCreateRelationAction: boolean | null;
    PerformsSendEmailAction: boolean | null;
    SetOwnerActionMessage: string | null;
    WriteJournalActionTitle: string | null;
    WriteJournalActionTypeEn: string | null;
    WriteJournalActionImportanceEn: string | null;
    WriteJournalActionMessage: string | null;
    AllActionEvents: IApiEvent[] | null;
    ActionItemGuid: string | null;
    ActionXml: string | null;
}
