import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, from } from 'rxjs';

import { ProductsService } from '../services/products.service';
import { LogService } from '../services/log.service';
import { Product } from '../models/product';

import { IAppState } from '../store/state/app.state';
import { SelectProductAction } from '../store/actions/products.actions';
import { selectProduct } from '../store/selectors/product.selectors';

@Component({
  selector: 'app-product-get',
  templateUrl: './product-get.component.html',
  styleUrls: ['./product-get.component.less']
})
export class ProductGetComponent implements OnInit {

  products: Product[];
  selected$: Observable<string>;

  constructor(private productsService: ProductsService, private logService: LogService, private store: Store<IAppState>) {
     this.selected$ = store.select(selectProduct);
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
    this.store.dispatch(new SelectProductAction(id));
  }

  ngOnInit() {
    this.productsService
    .getProducts()
    .subscribe((data: Product[]) => {
        this.products = data;
    });
  }

}
