import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';

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
import { Router } from '@angular/router';

@Injectable()
export class ProductsEffects {

  constructor(
    private _productsService: ProductsService,
    private _actions$: Actions,
    private _router: Router,
  ) {}

  @Effect()
  createProduct$ = this._actions$.pipe(
    ofType<CreateProductAction>(EProductActions.CreateProduct),
    map(action => action.payload),
    switchMap((product: Product) => {
      return this._productsService
        .createProduct(product)
        .pipe(
          switchMap((success) => {
            if (success) {
              return of (new CreateProductSuccess());
            }

            return of (new CreateProductFail());
          }),
          catchError(() => of (new CreateProductFail())),
        );
    })
  );

  @Effect({ dispatch: false })
  createProductSuccess$ = this._actions$.pipe(
    ofType<CreateProductSuccess>(EProductActions.CreateProductSuccess),
    tap(() => {
      this._router.navigate(['products']);
    }),
  );

  @Effect({ dispatch: false })
  createProductFail$ = this._actions$.pipe(
    ofType<CreateProductFail>(EProductActions.CreateProductFail),
    tap(() => {
      // TODO: show modal dialog for this case (Effect without `dispatch: false`)
      alert('Something went wrong while adding new product (see console logs)');
    }),
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
