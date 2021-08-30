export interface IApiEvent {
    TypeName: TActionEventType;
    Actions: TApiAction[]
}

export type TActionEventType = 'OnValueChanging' | 'OnValueChanged' | 'OnSaving' | 'OnSaved' | 'OnLoad' | 'OnLoading';

export type TApiAction = IApiWriteJournalEntryAction;

export interface IApiAction {
    Name: string | null;
    ExecuteOnlyOnce: boolean;
    ActionRelevantList: IApiActionRelevant[];
}

interface IApiActionRelevant {
    GroupName: string;
    CompletionLevelName: TCompletionLevel;
}

export type TCompletionLevel = 'DoNothing' | 'CanIgnore' | 'CannotIgnore';

export interface IApiWriteJournalEntryAction extends IApiAction {
    __type: 'WriteJournalEntryAction:#EA';
    Data: {
        TypeEn: string | null;
        FileAs: string | null;
        Note: string | null;
        ImportanceEn: string | null;
    };
}