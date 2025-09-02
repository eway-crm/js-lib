export type TRelationType = 'GENERAL'
    | 'GROUP'
    | 'CONTACTPERSON'
    | 'CONTACT'
    | 'CUSTOMER'
    | 'COMPANY'
    | 'OUTLOOKPROJECT'
    | 'SUPERVISOR'
    | 'PROJECT_ORIGIN'
    | 'CART'
    | 'GOODSINCART'
    | 'SUPERIORITEM';

export default class RelationTypes {
    static readonly general: TRelationType = 'GENERAL';
    static readonly group: TRelationType = 'GROUP';
    static readonly contactPerson: TRelationType = 'CONTACTPERSON';
    static readonly contact: TRelationType = 'CONTACT';
    static readonly customer: TRelationType = 'CUSTOMER';
    static readonly company: TRelationType = 'COMPANY';
    static readonly outlookProject: TRelationType = 'OUTLOOKPROJECT';
    static readonly supervisor: TRelationType = 'SUPERVISOR';
    static readonly projectOrigin: TRelationType = 'PROJECT_ORIGIN';
    static readonly cart: TRelationType = 'CART';
    static readonly goodsInCart: TRelationType = 'GOODSINCART';
    static readonly superiorItem: TRelationType = 'SUPERIORITEM';
}

export class RelationTypeIds {
    static readonly general = 1;
    static readonly group = 2;
    static readonly contactPerson = 10;
    static readonly contact = 11;
    static readonly customer = 12;
    static readonly company = 13;
    static readonly outlookProject = 28;
    static readonly supervisor = 32;
    static readonly projectOrigin = 25;
    static readonly cart = 9;
    static readonly goodsInCart = 15;
    static readonly superiorItem = 31;
}