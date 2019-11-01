import { createSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { IProductState } from '../state/product.state';

const productsFromStore = (state: IAppState) => state.products;

export const selectProduct = createSelector(
  productsFromStore,
  (state: IProductState) => state.selectedProduct,
);

export const selectProducts = createSelector(
  productsFromStore,
  (state: IProductState) => state.products,
);
