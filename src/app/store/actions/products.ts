import { Action } from '@ngrx/store';
import * as types from '../types';

export class SelectProductAction implements Action {
    readonly type = types.SELECT_PRODUCT;

    constructor(public payload: string) {}
}
