import { TApiQueryField } from './IApiQuery';

interface IApiQueryFilterExpressionPredicateBase {
    Field: TApiQueryField;
    Value: string | number | boolean | null;
}

export type TApiQueryFilterExpression =
    | IApiQueryEqualsFilterExpressionPredicate
    | IApiQueryLessFilterExpressionPredicate
    | IApiQueryLessOrEqualFilterExpressionPredicate
    | IApiQueryGreaterFilterExpressionPredicate
    | IApiQueryGreaterOrEqualFilterExpressionPredicate
    | IApiQueryLikeFilterExpressionPredicate
    | IApiQueryOrFilterExpressionOperator
    | IApiQueryNotFilterExpression
    | IApiQueryAndFilterExpressionOperator;

export interface IApiQueryEqualsFilterExpressionPredicate extends IApiQueryFilterExpressionPredicateBase {
    __type: 'EqualsFilterExpressionPredicate:#EQ';
}

export interface IApiQueryLessFilterExpressionPredicate extends IApiQueryFilterExpressionPredicateBase {
    __type: 'LessFilterExpressionPredicate:#EQ';
}

export interface IApiQueryLessOrEqualFilterExpressionPredicate extends IApiQueryFilterExpressionPredicateBase {
    __type: 'LessOrEqualFilterExpressionPredicate:#EQ';
}

export interface IApiQueryGreaterFilterExpressionPredicate extends IApiQueryFilterExpressionPredicateBase {
    __type: 'GreaterFilterExpressionPredicate:#EQ';
}

export interface IApiQueryGreaterOrEqualFilterExpressionPredicate extends IApiQueryFilterExpressionPredicateBase {
    __type: 'GreaterOrEqualFilterExpressionPredicate:#EQ';
}

export interface IApiQueryLikeFilterExpressionPredicate extends IApiQueryFilterExpressionPredicateBase {
    __type: 'LikeFilterExpressionPredicate:#EQ';
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
