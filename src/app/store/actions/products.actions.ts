import { Action } from '@ngrx/store';
import { Product } from '../../models/product';

export enum EProductActions {
  GetProducts = '[Product] Get Products',
  GetProductsSuccess = '[Product] Get Products Success',
  SelectProduct = '[Product] Select Product',
  DeleteProduct = '[Product] Delete Product',
  DeleteProductSuccess = '[Product] Delete Product Success',
  DeleteProductFail = '[Product] Delete Product Fail',
  CreateProduct = '[Product] Create Product',
  CreateProductSuccess = '[Product] Create Product Success',
  CreateProductFail = '[Product] Create Product Fail',
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

export class CreateProductAction implements Action {
  readonly type = EProductActions.CreateProduct;
  constructor(public payload: Product) {}
}

export class CreateProductSuccess implements Action {
  readonly type = EProductActions.CreateProductSuccess;
}

export class CreateProductFail implements Action {
  readonly type = EProductActions.CreateProductFail;
}

export type ProductActions =
  SelectProductAction |
  GetProductsAction |
  DeleteProductAction |
  GetProductsSuccess |
  DeleteProductSuccess |
  DeleteProductFail |
  CreateProductAction |
  CreateProductSuccess |
  CreateProductFail;
