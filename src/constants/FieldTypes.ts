export type TFieldType =
    | 'TextBox'
    | 'ComboBox'
    | 'NumericBox'
    | 'Relation'
    | 'CheckBox'
    | 'LinkTextBox'
    | 'DateEdit'
    | 'MemoBox'
    | 'MultiSelectComboBox'
    | 'WorkflowState'
    | 'Image'
    | 'MultiSelectRelation';

export default class FieldTypes {
    static readonly textBox: TFieldType = 'TextBox';
    static readonly comboBox: TFieldType = 'ComboBox';
    static readonly numericBox: TFieldType = 'NumericBox';
    static readonly relation: TFieldType = 'Relation';
    static readonly checkBox: TFieldType = 'CheckBox';
    static readonly linkTextBox: TFieldType = 'LinkTextBox';
    static readonly dateEdit: TFieldType = 'DateEdit';
    static readonly memoBox: TFieldType = 'MemoBox';
    static readonly multiSelectComboBox: TFieldType = 'MultiSelectComboBox';
    static readonly workflowState = 'WorkflowState';
    static readonly image: TFieldType = 'Image';
    static readonly multiSelectRelation: TFieldType = 'MultiSelectRelation';
}
