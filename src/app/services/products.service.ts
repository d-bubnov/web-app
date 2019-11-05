import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from '../models/product';
import { IProductHttp, IProductHttpBase } from '../models/http-models/http.product';
import { LogService } from './log.service';
import { switchMap, tap, catchError } from 'rxjs/operators';
import { of, Observable, throwError } from 'rxjs';

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
    this.logService.info('Trying to add new product');

    const productToAdd: IProductHttpBase = {
      ProductName: name,
      ProductPrice: price,
      ProductDescription: description,
    };

    return this.httpClient
      .post(`${this.uri}/add`, productToAdd);
  }

  /**
   * Edit product
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
   * Delete product by id
   * @param id product ID
   */
  deleteProduct(id: string): Observable<string> {
    this.logService.info(`Trying to delete the product by id='${id}'`);

    return this
      .httpClient
      .get<string>(`${this.uri}/delete/${id}`)
      .pipe(
        tap(response => {
          this.logService.log('Response: ', response);
        }),
        catchError(error => {
          this.logService.error(error);
          return throwError(error);
        })
    );
  }

  /**
   * Get all products
   */
  getProducts(): Observable<Product[]> {
    this.logService.info('Trying to get all products');

    return this
      .httpClient
      .get<IProductHttp[]>(`${this.uri}`)
      .pipe(
        switchMap((httpProducts: IProductHttp[]) => {
          const products: Product[] = httpProducts.map(product => this.convert(product));
          return of(products);
        }),
        catchError(error => {
          this.logService.error(error);
          return throwError(error);
        })
      );
  }
}
