import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from '../models/Product';
import { LogService } from '../services/log.service';

@Component({
  selector: 'app-product-get',
  templateUrl: './product-get.component.html',
  styleUrls: ['./product-get.component.less']
})
export class ProductGetComponent implements OnInit {

  products: Product[];

  constructor(private productsService: ProductsService, private logService: LogService) { }

  deleteProduct(id: string) {
    this.productsService
      .deleteProduct(id)
      .subscribe(result => {
        const index = this.products.findIndex((product) => (product._id === id));
        this.products.splice(index);
      });
  }

  ngOnInit() {
    this.productsService
    .getProducts()
    .subscribe((data: Product[]) => {
        this.products = data;
    });
  }

}
