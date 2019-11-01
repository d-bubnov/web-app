import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from '../models/product';
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

    return this.httpClient
      .post(`${this.uri}/add`, product);
  }

  editProduct(id: string) {
    const product = this.httpClient
      .get(`${this.uri}/edit/${id}`);

    return product;
  }

  updateProduct(ProductName: string, ProductDescription: string, ProductPrice: number, id: string) {
    const product: Product = {
      ProductName,
      ProductPrice,
      ProductDescription,
    };

    return this.httpClient
      .post(`${this.uri}/update/${id}`, product);
  }

  deleteProduct(id: string) {
    this.logService.write(`Trying to delete the product by id='${id}'`);

    return this.httpClient
      .get(`${this.uri}/delete/${id}`);
  }

  getProducts() {
    this.logService.write('Trying to get the products...');

    return this
      .httpClient
      .get(`${this.uri}`);
  }
}
