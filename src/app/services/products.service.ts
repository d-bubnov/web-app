import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from '../models/product';
import { IProductHttp, IProductHttpBase } from '../models/http-models/http.product';
import { LogService } from './log.service';
import { switchMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  uri = 'http://localhost:4000/products';

  constructor(private httpClient: HttpClient, private logService: LogService) { }

  private convert(product: IProductHttp): Product {
    return new Product(
      product._id,
      product.ProductName,
      product.ProductDescription,
      product.ProductPrice
    );
  }

  addProduct(name: string, description: string, price: number) {
    const productToAdd: IProductHttpBase = {
      ProductName: name,
      ProductPrice: price,
      ProductDescription: description,
    };

    this.logService.write(productToAdd, 'Trying to add next product: ');

    return this.httpClient
      .post(`${this.uri}/add`, productToAdd);
  }

  /**
   * Edit product (good method)
   * @param id product ID
   */
  editProduct(id: string): Observable<Product> {
    return this.httpClient
      .get<IProductHttp>(`${this.uri}/edit/${id}`)
      .pipe(
        switchMap((httpProduct: IProductHttp) => of(this.convert(httpProduct)))
      );
  }

  updateProduct(id: string, name: string, description: string, price: number) {
    const productToUpdate: IProductHttpBase = {
      _id: id,
      ProductName: name,
      ProductPrice: price,
      ProductDescription: description,
    };

    return this.httpClient
      .post(`${this.uri}/update/${id}`, productToUpdate);
  }

  /**
   * Delete product by id (good method)
   * @param id product ID
   */
  deleteProduct(id: string) {
    this.logService.write(`Trying to delete the product by id='${id}'`);

    return this
      .httpClient
      .get(`${this.uri}/delete/${id}`)
      .subscribe(result => {
        this.logService.write(id, 'Product was deleted successfully: ');
      });
  }

  getProducts() {
    this.logService.write('Trying to get the products...');

    return this
      .httpClient
      .get(`${this.uri}`);
  }
}
