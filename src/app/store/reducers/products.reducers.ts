import { ProductActions, EProductActions } from '../actions/products.actions';
import { IProductState, initialProductState } from '../state/product.state';

export function productReducer(
  state = initialProductState,
  action: ProductActions
): IProductState {
  switch (action.type) {
    case EProductActions.GetProductsSuccess: {
      const products = action.payload;
      return {
        ...state,
        products,
      };
    }
    case EProductActions.SelectProduct: {
      const id: string = action.payload;
      return {
        ...state,
        selectedProduct: id,
      };
    }
    default: {
      return state;
    }
  }
}
