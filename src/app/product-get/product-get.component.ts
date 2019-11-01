import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  SelectProductAction,
  GetProductsAction,
  DeleteProductAction,
} from '../store/actions/products.actions';

import { selectProduct, selectProducts } from '../store/selectors/product.selectors';
import { IAppState } from '../store/state/app.state';
import { IProduct } from '../models/product';

@Component({
  selector: 'app-product-get',
  templateUrl: './product-get.component.html',
  styleUrls: ['./product-get.component.less']
})
export class ProductGetComponent implements OnInit {

  products$: Observable<IProduct[]> = this._store.pipe(select(selectProducts));
  selected$: Observable<string> = this._store.pipe(select(selectProduct));

  constructor(private _store: Store<IAppState>) {}

  deleteProduct(id: string) {
    this._store.dispatch(new DeleteProductAction(id));
  }

  selectRow(id: string) {
    this._store.dispatch(new SelectProductAction(id));
  }

  ngOnInit() {
    this._store.dispatch(new GetProductsAction());
  }

}
