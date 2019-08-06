import {
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
 } from '@ngrx/store';

import * as fromProducts from './products';

export interface State {
    selected: fromProducts.State;
}

export const reducers: ActionReducerMap<State> = {
    selected: fromProducts.reducer
};

export const getProductsState = createFeatureSelector<fromProducts.State>('selected');

export const getSelectedProduct = createSelector(getProductsState, fromProducts.getSelected);
