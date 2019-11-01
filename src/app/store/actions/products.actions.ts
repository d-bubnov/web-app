import { Action } from '@ngrx/store';
import { Product } from '../../models/product';

export enum EProductActions {
  GetProducts = '[Product] Get Products',
  GetProductsSuccess = '[Product] Get Products Success',
  SelectProduct = '[Product] Select Product',
  DeleteProduct = '[Product] Delete Product',
}

export class GetProductsAction implements Action {
  readonly type = EProductActions.GetProducts;
}

export class GetProductsSuccess implements Action {
  readonly type = EProductActions.GetProductsSuccess;
  constructor(public payload: Product[]) {}
}

export class SelectProductAction implements Action {
  readonly type = EProductActions.SelectProduct;
  constructor(public payload: string) {}
}

export class DeleteProductAction implements Action {
  readonly type = EProductActions.DeleteProduct;
  constructor(public payload: string) {}
}

export type ProductActions = SelectProductAction | GetProductsAction | DeleteProductAction | GetProductsSuccess;
