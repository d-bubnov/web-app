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
  CreateProductAction,
  CreateProductSuccess,
  ProductFailAction,
  DeleteProductFail,
  GetProductAction,
  GetProductSuccess,
  UpdateProductAction,
  UpdateProductSuccess,
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
          switchMap((success: boolean) => {
            if (success) {
              return of (new CreateProductSuccess());
            }

            const message = 'Something went wrong while adding the new product';
            return of (new ProductFailAction(message));
          }),
          catchError((error) => of (new ProductFailAction(error))),
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
  productFailAction$ = this.actions$.pipe(
    ofType<ProductFailAction>(EProductActions.ProductFailAction),
    map(action => action.payload),
    tap(() => {
      this.router.navigate(['products']);
    }),
    switchMap((message: string) => {
      return of (new OpenModalAction(message));
    }),
  );

  @Effect()
  getProduct$ = this.actions$.pipe(
    ofType<GetProductAction>(EProductActions.GetProduct),
    map(action => action.payload),
    switchMap((id: string) => {
      return this.productsService
      .getProduct(id)
      .pipe(
        switchMap((product: Product) => {
          return of(new GetProductSuccess(product));
        }),
        catchError(error => {
          return of(new OpenModalAction('Something went wrong...'));
        })
      );
    })
  );

  @Effect()
  deleteProduct$ = this.actions$.pipe(
    ofType<DeleteProductAction>(EProductActions.DeleteProduct),
    map(action => action.payload),
    switchMap((id: string) => {
      return this.productsService
        .deleteProduct(id)
        .pipe(
          switchMap((success: boolean) => {
            if (success) {
              return of (new DeleteProductSuccess(id));
            }

            const message = `
              Something went wrong while deleting of the product.
              Try to reload page or contact your system administrator.
            `;
            return of (new DeleteProductFail(message));
          }),
          catchError((error) => {
            return of (new DeleteProductFail(error));
          }),
        );
    })
  );

  @Effect()
  deleteProductFail$ = this.actions$.pipe(
    ofType<DeleteProductFail>(EProductActions.DeleteProductFail),
    map(action => action.payload),
    switchMap((message: string) => {
      return of(new OpenModalAction(message));
    }),
  );

  @Effect()
  updateProduct$ = this.actions$.pipe(
    ofType<UpdateProductAction>(EProductActions.UpdateProduct),
    map(action => action.payload),
    switchMap((product: Product) => {
      return this.productsService
        .updateProduct(product)
        .pipe(
          tap(() => {
            this.router.navigate(['products']);
          }),
          switchMap((success: boolean) => {
            if (success) {
              return of (new UpdateProductSuccess());
            }

            const message = 'Something went wrong while updating the product';
            return of (new ProductFailAction(message));
          }),
          catchError((error) => of (new ProductFailAction(error))),
        );
    })
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
