import { Action } from '@ngrx/store';
import { Product } from '../../models/product';

export enum EProductActions {
  GetProduct = '[Product] Get Product',
  GetProductSuccess = '[Product] Get Product Success',
  GetProducts = '[Product] Get Products',
  GetProductsSuccess = '[Product] Get Products Success',
  SelectProduct = '[Product] Select Product',
  DeleteProduct = '[Product] Delete Product',
  DeleteProductSuccess = '[Product] Delete Product Success',
  DeleteProductFail = '[Product] Delete Product Fail',
  CreateProduct = '[Product] Create Product',
  CreateProductSuccess = '[Product] Create Product Success',
  ProductFailAction = '[Product] Product Action Failed',
  UpdateProduct = '[Product] Update Product',
  UpdateProductSuccess = '[Product] Update Product Success',
}

export class GetProductsAction implements Action {
  readonly type = EProductActions.GetProducts;
}

export class GetProductsSuccess implements Action {
  readonly type = EProductActions.GetProductsSuccess;
  constructor(public payload: Product[]) {}
}

export class GetProductAction implements Action {
  readonly type = EProductActions.GetProduct;
  constructor(public payload: string) {}
}

export class GetProductSuccess implements Action {
  readonly type = EProductActions.GetProductSuccess;
  constructor(public payload: Product) {}
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
  constructor(public payload: string) {}
}

export class CreateProductAction implements Action {
  readonly type = EProductActions.CreateProduct;
  constructor(public payload: Product) {}
}

export class CreateProductSuccess implements Action {
  readonly type = EProductActions.CreateProductSuccess;
}

export class ProductFailAction implements Action {
  readonly type = EProductActions.ProductFailAction;
  constructor(public payload: string) {}
}

export class UpdateProductAction implements Action {
  readonly type = EProductActions.UpdateProduct;
  constructor(public payload: Product) {}
}

export class UpdateProductSuccess implements Action {
  readonly type = EProductActions.UpdateProductSuccess;
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
  ProductFailAction |
  GetProductAction |
  GetProductSuccess |
  UpdateProductAction |
  UpdateProductSuccess;
