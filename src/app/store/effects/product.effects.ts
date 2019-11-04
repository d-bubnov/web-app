import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';

import { IAppState } from '../state/app.state';
import {
  EProductActions,
  GetProductsAction,
  GetProductsSuccess,
  DeleteProductAction,
} from '../actions/products.actions';
import { IProductHttp } from '../../models/http-models/http.product';
import { ProductsService } from '../../services/products.service';
import { Product } from 'src/app/models/product';
import { selectProducts, selectProduct } from '../selectors/product.selectors';
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
    withLatestFrom(this._store.pipe(select(selectProducts))),
    switchMap(([id, products]) => {
      this._productsService.deleteProduct(id);

      const newProducts = products.filter(product => product.id !== id);
      return of(new GetProductsSuccess(newProducts));
    }),
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
// Comment
