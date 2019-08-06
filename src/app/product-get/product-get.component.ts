import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { ProductsService } from '../services/products.service';
import { LogService } from '../services/log.service';
import { Product } from '../models/Product';

import * as productsReducer from '../store/reducers';
import * as productsActions from '../store/actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-get',
  templateUrl: './product-get.component.html',
  styleUrls: ['./product-get.component.less']
})
export class ProductGetComponent implements OnInit {

  products: Product[];
  selected$: Observable<string>;

  constructor(private productsService: ProductsService, private logService: LogService, private store: Store<productsReducer.State>) {
     this.selected$ = store.select(productsReducer.getSelectedProduct);
     this.logService.write(this.selected$);
   }

  deleteProduct(id: string) {
    this.productsService
      .deleteProduct(id)
      .subscribe(result => {
        const index = this.products.findIndex((product) => (product._id === id));
        this.products.splice(index);
      });
  }

  selectRow(id: string) {
    this.store.dispatch(new productsActions.SelectProductAction(id));
  }

  ngOnInit() {
    this.productsService
    .getProducts()
    .subscribe((data: Product[]) => {
        this.products = data;
    });
  }

}
