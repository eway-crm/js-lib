import { TActionEventType } from "../data/workflowActions/IApiAction";

export default class ActionEventTypes {
    static readonly onValueChanging: TActionEventType = 'OnValueChanging';
    static readonly onValueChanged: TActionEventType = 'OnValueChanged';
    static readonly onSaving: TActionEventType = 'OnSaving';
    static readonly onSaved: TActionEventType = 'OnSaved';
    static readonly onLoad: TActionEventType = 'OnLoad';
    static readonly onLoading: TActionEventType = 'OnLoading';
}