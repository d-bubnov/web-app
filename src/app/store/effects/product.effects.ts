import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';

import {
  EProductActions,
  GetProductsAction,
  GetProductsSuccess,
  DeleteProductAction,
  DeleteProductSuccess,
  DeleteProductFail,
  CreateProductAction,
  CreateProductSuccess,
  CreateProductFail,
} from '../actions/products.actions';

import { ProductsService } from '../../services/products.service';
import { Product } from 'src/app/models/product';

@Injectable()
export class ProductsEffects {

  constructor(
    private _productsService: ProductsService,
    private _actions$: Actions,
  ) {}

  @Effect()
  createProduct$ = this._actions$.pipe(
    ofType<CreateProductAction>(EProductActions.CreateProduct),
    map(action => action.payload),
    switchMap((product: Product) => {
      return this._productsService
        .createProduct(product)
        .pipe(
          switchMap(([id]) => {
            // TODO: question to Ilya
            const newProduct = new Product(id, product.name, product.description, product.price);
            return of (new CreateProductSuccess(newProduct));
          }),
          catchError(() => of (new CreateProductFail())),
        );
    })
  );

  @Effect()
  deleteProduct$ = this._actions$.pipe(
    ofType<DeleteProductAction>(EProductActions.DeleteProduct),
    map(action => action.payload),
    switchMap((id: string) => {
      return this._productsService
        .deleteProduct(id)
        .pipe(
          map(() => new DeleteProductSuccess(id)),
          catchError(() => of (new DeleteProductFail())),
        );
    })
  );

  @Effect()
  getProducts$ = this._actions$.pipe(
    ofType<GetProductsAction>(EProductActions.GetProducts),
    switchMap(() => {
      return this._productsService
        .getProducts()
        .pipe(
          map((products: Product[]) => new GetProductsSuccess(products)),
          catchError(() => of (new GetProductsSuccess([])))
        );
    })
  );

}
