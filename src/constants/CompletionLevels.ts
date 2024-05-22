import type { TCompletionLevel } from "../data/workflowActions/IApiAction";

export default class CompletionLevels {
    static readonly doNothing: TCompletionLevel = 'DoNothing';
    static readonly canIgnore: TCompletionLevel = 'CanIgnore';
    static readonly cannotIgnore: TCompletionLevel = 'CannotIgnore';
}