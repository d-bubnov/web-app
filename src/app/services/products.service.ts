import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  uri = 'http://localhost:4000/products';

  constructor(private httpClient: HttpClient) { }

  addProduct(ProductName: string, ProductDescription: string, ProductPrice: number) {
    const product: Product = {
      ProductName,
      ProductPrice,
      ProductDescription,
    };

    console.log('Trying to add next product: ', product);

    this.httpClient
      .post(`${this.uri}/add`, product)
      .subscribe(result => {
        console.log('Result: ', result);
      });
  }

  getProducts() {
    return this
      .httpClient
      .get(`${this.uri}`);
  }
}
