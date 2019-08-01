import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from '../models/Product';

@Component({
  selector: 'app-product-get',
  templateUrl: './product-get.component.html',
  styleUrls: ['./product-get.component.less']
})
export class ProductGetComponent implements OnInit {

  products: Product[];

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.productsService
      .getProducts()
      .subscribe((data: Product[]) => {
        this.products = data;
    });
  }

}
