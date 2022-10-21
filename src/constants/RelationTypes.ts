export type TRelationType = 'GENERAL'
    | 'GROUP'
    | 'CONTACTPERSON'
    | 'CONTACT'
    | 'CUSTOMER'
    | 'COMPANY'
    | 'SUPERVISOR';

export default class RelationTypes {
    static readonly general: TRelationType = 'GENERAL';
    static readonly group: TRelationType = 'GROUP';
    static readonly contactPerson: TRelationType = 'CONTACTPERSON';
    static readonly contact: TRelationType = 'CONTACT';
    static readonly customer: TRelationType = 'CUSTOMER';
    static readonly company: TRelationType = 'COMPANY';
    static readonly supervisor: TRelationType = 'SUPERVISOR';
}