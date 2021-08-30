import { TFolderName } from "../../constants/FolderNames";

export interface IApiEvent {
    TypeName: TActionEventType;
    Actions: TApiAction[]
}

export type TActionEventType = 'OnValueChanging' | 'OnValueChanged' | 'OnSaving' | 'OnSaved' | 'OnLoad' | 'OnLoading';

export type TApiAction = IApiWriteJournalEntryAction;

export interface IApiAction {
    Name: string | null;
    ExecuteOnlyOnce: boolean;
    Relevance: TApiActionRelevant[];
}

type TApiActionRelevant = ({
    GroupName: null;
    IsForAllGroups: true;
} | {
    GroupName: string;
    IsForAllGroups: false;
}) & {
    CompletionLevelName: TCompletionLevel;
};

export type TCompletionLevel = 'DoNothing' | 'CanIgnore' | 'CannotIgnore';

export interface IApiAreEqualAction extends IApiAction {
    __type: 'AreEqualAction:#EA';
    ComparisonParameters: {
        ExpectedValue: string | null;
        ActualValue: string | null;
        NotEqualMessage: string | null;
    };
}

export interface IApiCreateRelationAction extends IApiAction {
    __type: 'CreateRelationAction:#EA';
    NewRelationParameters: {
        RelatedItemFileAs: string | null;
        RelatedFolderName: TFolderName | null;
        CreateItemCopy: boolean | null;
    };
}

export interface IApiCreateTaskAction extends IApiAction {
    __type: 'CreateTaskAction:#EA';
    TaskData: {
        TypeEn: string | null;
        Subject: string | null;
        Delegator: string | null;
        Solver: string | null;
        DueDate: string | null;
        ReminderDate: string | null;
        ImportanceEn: string | null;
        SuperiorItem: string | null;
        Company: string | null;
        Contact: string | null;
        Relations: string[] | null;
        OpenWindowWhenPossible: boolean | null;
    };
}

export interface IApiDatabaseFieldIsNotEmptyAction extends IApiAction {
    __type: 'DatabaseFieldIsNotEmptyAction:#EA';
    FieldName: string | null;
}

export interface IApiCheckPresenceOfRelationAction extends IApiAction {
    __type: 'CheckPresenceOfRelationAction:#EA';
    CheckParameters: {
        RelationType: string | null;
        RelatedFolderName: TFolderName | null;
        RelationMissingMessage: string | null;
        RelatedItemConditions: {
            FieldName: string;
            Value: string | null;
        }[] | null;
    };
}

export interface IApiLockFieldAction extends IApiAction {
    __type: 'LockFieldAction:#EA';
    FieldName: string | null;
}

export interface IApiLockFormAction extends IApiAction {
    __type: 'LockFormAction:#EA';
}

export interface IApiSendEmailAction extends IApiAction {
    __type: 'SendEmailAction:#EA';
    EmailData: {
        Body: string | null;
        Subject: string | null;
        RecipientGroups: string | null;
        RecipientUsers: string | null;
    };
}

export interface IApiSetFieldValueAction extends IApiAction {
    __type: 'SetFieldValueAction:#EA';
    FieldName: string | null;
    NewValue: string | null;
}

export interface IApiSetItemOwnerAction extends IApiAction {
    __type: 'SetItemOwnerAction:#EA';
    Message: string | null;
}

export interface IApiWriteJournalEntryAction extends IApiAction {
    __type: 'WriteJournalEntryAction:#EA';
    JournalData: {
        TypeEn: string | null;
        FileAs: string | null;
        Note: string | null;
        ImportanceEn: string | null;
    };
}