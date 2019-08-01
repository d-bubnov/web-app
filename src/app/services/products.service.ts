import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from '../models/Product';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  uri = 'http://localhost:4000/products';

  constructor(private httpClient: HttpClient, private logService: LogService) { }

  addProduct(ProductName: string, ProductDescription: string, ProductPrice: number) {
    const product: Product = {
      ProductName,
      ProductPrice,
      ProductDescription,
    };

    this.logService.write(product, 'Trying to add next product: ');

    this.httpClient
      .post(`${this.uri}/add`, product)
      .subscribe(result => {
        this.logService.write(result, 'Result: ');
      });
  }

  getProducts() {
    this.logService.write('Trying to get the products...');

    return this
      .httpClient
      .get(`${this.uri}`);
  }
}
