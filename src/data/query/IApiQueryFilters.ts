import { TApiQueryField } from './IApiQuery';

interface IApiQueryFilterExpressionPredicateBase {
    Field: TApiQueryField;
    Value: string | number | boolean | null;
}

export type TApiQueryFilterExpression =
    | IApiQueryEqualsFilterExpressionPredicate
    | IApiQueryLessOrEqualFilterExpressionPredicate
    | IApiQueryGreaterFilterExpressionPredicate
    | IApiQueryOrFilterExpressionOperator
    | IApiQueryNotFilterExpression
    | IApiQueryAndFilterExpressionOperator;

export interface IApiQueryEqualsFilterExpressionPredicate extends IApiQueryFilterExpressionPredicateBase {
    __type: 'EqualsFilterExpressionPredicate:#EQ';
}

export interface IApiQueryLessOrEqualFilterExpressionPredicate extends IApiQueryFilterExpressionPredicateBase {
    __type: 'LessOrEqualFilterExpressionPredicate:#EQ';
}

export interface IApiQueryGreaterFilterExpressionPredicate extends IApiQueryFilterExpressionPredicateBase {
    __type: 'GreaterFilterExpressionPredicate:#EQ';
}

export interface IApiQueryNotFilterExpression {
    __type: 'NotFilterExpression:#EQ';
    Child: TApiQueryFilterExpression;
}

export interface IApiQueryAndFilterExpressionOperator {
    __type: 'AndFilterExpressionOperator:#EQ';
    Children: TApiQueryFilterExpression[];
}

export interface IApiQueryOrFilterExpressionOperator {
    __type: 'OrFilterExpressionOperator:#EQ';
    Children: TApiQueryFilterExpression[];
}
