import { createSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { IProductState } from '../state/product.state';

const productsFromStore = (state: IAppState) => state.products;

export const selectProductId = createSelector(
  productsFromStore,
  (state: IProductState) => state.selectedProductId,
);

export const selectCurrentProduct = createSelector(
  productsFromStore,
  (state: IProductState) => state.currentProduct,
);

export const selectProducts = createSelector(
  productsFromStore,
  (state: IProductState) => state.products,
);
