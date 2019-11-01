import { Action } from '@ngrx/store';

export enum EProductActions {
    SelectProduct = '[Product] Select',
}

export class SelectProductAction implements Action {
    readonly type = EProductActions.SelectProduct;
    constructor(public payload: string) {}
}

export type ProductActions = SelectProductAction;
