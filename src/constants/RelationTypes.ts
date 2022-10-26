export type TRelationType = 'GENERAL'
    | 'GROUP'
    | 'CONTACTPERSON'
    | 'CONTACT'
    | 'CUSTOMER'
    | 'COMPANY'
    | 'OUTLOOKPROJECT'
    | 'SUPERVISOR';

export default class RelationTypes {
    static readonly general: TRelationType = 'GENERAL';
    static readonly group: TRelationType = 'GROUP';
    static readonly contactPerson: TRelationType = 'CONTACTPERSON';
    static readonly contact: TRelationType = 'CONTACT';
    static readonly customer: TRelationType = 'CUSTOMER';
    static readonly company: TRelationType = 'COMPANY';
    static readonly outlookProject: TRelationType = 'OUTLOOKPROJECT';
    static readonly supervisor: TRelationType = 'SUPERVISOR';
}