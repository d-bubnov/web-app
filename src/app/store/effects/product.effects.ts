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
import { OpenModalAction } from '../actions/modal.actions';

import { ProductsService } from '../../services/products.service';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';

@Injectable()
export class ProductsEffects {

  constructor(
    private productsService: ProductsService,
    private actions$: Actions,
    private router: Router,
  ) {}

  @Effect()
  createProduct$ = this.actions$.pipe(
    ofType<CreateProductAction>(EProductActions.CreateProduct),
    map(action => action.payload),
    switchMap((product: Product) => {
      return this.productsService
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
  createProductSuccess$ = this.actions$.pipe(
    ofType<CreateProductSuccess>(EProductActions.CreateProductSuccess),
    tap(() => {
      this.router.navigate(['products']);
    }),
  );

  @Effect()
  createProductFail$ = this.actions$.pipe(
    ofType<CreateProductFail>(EProductActions.CreateProductFail),
    switchMap(() => {
      const message = 'Something went wrong while adding the new product';
      return of(new OpenModalAction(message));
    }),
  );

  @Effect()
  deleteProduct$ = this.actions$.pipe(
    ofType<DeleteProductAction>(EProductActions.DeleteProduct),
    map(action => action.payload),
    switchMap((id: string) => {
      return this.productsService
        .deleteProduct(id)
        .pipe(
          map(() => new DeleteProductSuccess(id)),
          catchError(() => of (new DeleteProductFail())),
        );
    })
  );

  @Effect()
  deleteProductFail$ = this.actions$.pipe(
    ofType<DeleteProductFail>(EProductActions.DeleteProductFail),
    switchMap(() => {
      const message = 'Something went wrong while deleting of the product';
      return of(new OpenModalAction(message));
    }),
  );

  @Effect()
  getProducts$ = this.actions$.pipe(
    ofType<GetProductsAction>(EProductActions.GetProducts),
    switchMap(() => {
      return this.productsService
        .getProducts()
        .pipe(
          map((products: Product[]) => new GetProductsSuccess(products)),
          catchError(() => of (new GetProductsSuccess([])))
        );
    })
  );

}
