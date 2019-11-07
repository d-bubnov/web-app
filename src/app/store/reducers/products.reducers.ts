import { ProductActions, EProductActions } from '../actions/products.actions';
import { IProductState, initialProductState } from '../state/product.state';

export function productReducer(
  state: IProductState = initialProductState,
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
    case EProductActions.DeleteProductSuccess: {
      const id = action.payload;
      const products = state.products.filter(product => product.id !== id);
      return {
        ...state,
        products,
        selectedProduct: '',
      };
    }
    case EProductActions.SelectProduct: {
      const id: string = action.payload;
      return {
        ...state,
        selectedProduct: id,
      };
    }
    case EProductActions.DeleteProductFail:
    default: {
      return state;
    }
  }
}
