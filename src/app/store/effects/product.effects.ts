import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { IAppState } from '../state/app.state';
import {
  EProductActions,
  GetProductsAction,
  GetProductsSuccess,
  DeleteProductAction,
  DeleteProductSuccess,
} from '../actions/products.actions';
import { IProductHttp } from '../../models/http-models/http.product';
import { ProductsService } from '../../services/products.service';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';
import { LogService } from 'src/app/services/log.service';

@Injectable()
export class ProductsEffects {

  constructor(
    private _productsService: ProductsService,
    private _actions$: Actions,
    private _store: Store<IAppState>,
    private _router: Router,
    private _logService: LogService,
  ) {}

  @Effect()
  deleteProduct$ = this._actions$.pipe(
    ofType<DeleteProductAction>(EProductActions.DeleteProduct),
    map(action => action.payload),
    switchMap((id: string) => {
      return this._productsService
        .deleteProduct(id)
        .pipe(
          map(() => new DeleteProductSuccess(id))
        );
    })
  );

  @Effect()
  getProducts$ = this._actions$.pipe(
    ofType<GetProductsAction>(EProductActions.GetProducts),
    switchMap(() => this._productsService.getProducts()),
    switchMap((productsHttp: IProductHttp[]) => {
      const products = productsHttp.map(product => (
        new Product(product._id, product.ProductName, product.ProductDescription, product.ProductPrice)
      ));

      return of(new GetProductsSuccess(products));
    }),
  );

}
