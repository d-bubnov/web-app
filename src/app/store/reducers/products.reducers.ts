import {  ProductActions, EProductActions } from '../actions/products.actions';

import { IProductState, initialProductState } from '../state/product.state';

export function productReducer(state = initialProductState, action: ProductActions) {
    switch (action.type) {
        case EProductActions.SelectProduct: {
            const id: string = action.payload;
            return {
                ...state,
                selected: id,
            };
        }
        default: {
            return state;
        }
    }
}

export const getSelected = (state: IProductState) => state.selected;
