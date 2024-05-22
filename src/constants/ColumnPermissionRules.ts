import type { TApiColumnPermissionMandatoryRuleOptions, TApiColumnPermissionPermissionRuleOptions } from "../data/IApiColumnPermission";

export class ColumnPermissionPermissionRules {
    static readonly all: TApiColumnPermissionPermissionRuleOptions = 'All';
    static readonly own: TApiColumnPermissionPermissionRuleOptions = 'Own';
    static readonly readonly: TApiColumnPermissionPermissionRuleOptions = 'Readonly';
    static readonly invisible: TApiColumnPermissionPermissionRuleOptions = 'Invisible';
    static readonly none: TApiColumnPermissionPermissionRuleOptions = 'None';
}

export class ColumnPermissionMandatoryRules {
    static readonly mandatory: TApiColumnPermissionMandatoryRuleOptions = 'Mandatory';
    static readonly optional: TApiColumnPermissionMandatoryRuleOptions = 'Optional';
    static readonly unique: TApiColumnPermissionMandatoryRuleOptions = 'Unique';
    static readonly none: TApiColumnPermissionMandatoryRuleOptions = 'None';
}