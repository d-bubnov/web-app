import { Action } from '@ngrx/store';
import { Product } from '../../models/product';

export enum EProductActions {
  GetProducts = '[Product] Get Products',
  GetProductsSuccess = '[Product] Get Products Success',
  SelectProduct = '[Product] Select Product',
  DeleteProduct = '[Product] Delete Product',
  DeleteProductSuccess = '[Product] Delete Product Success',
  DeleteProductFail = '[Product] Delete Product Fail',
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

export class DeleteProductSuccess implements Action {
  readonly type = EProductActions.DeleteProductSuccess;
  constructor(public payload: string) {}
}

export class DeleteProductFail implements Action {
  readonly type = EProductActions.DeleteProductFail;
}

export type ProductActions =
  SelectProductAction |
  GetProductsAction |
  DeleteProductAction |
  GetProductsSuccess |
  DeleteProductSuccess |
  DeleteProductFail;
