import { createSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { IProductState } from '../state/product.state';

const selectProducts = (state: IAppState) => state.product;

export const selectProduct = createSelector(
  selectProducts,
  (state: IProductState) => state.selected
);
