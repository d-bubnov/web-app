import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Product } from '../models/product';
import { IProductHttp, IProductHttpBase } from '../models/http-models/http.product';
import { LogService } from './log.service';
import { switchMap, tap, catchError, map } from 'rxjs/operators';
import { of, Observable, throwError } from 'rxjs';
import { ResponseMessage } from '../models/http-models/response.message';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  uri = 'http://localhost:4000/products';

  constructor(
    private httpClient: HttpClient,
    private logService: LogService,
    private router: Router
  ) { }

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
   * Cretae new product
   * @param product Product entity to add
   */
  createProduct(product: Product) {
    this.logService.info('Trying to add new product');

    const productToAdd: IProductHttpBase = {
      ProductName: product.name,
      ProductPrice: product.price,
      ProductDescription: product.description,
    };

    return this.httpClient
      .post<ResponseMessage<string>>(`${this.uri}/add`, productToAdd)
      .pipe(
        map(response => [response.Data, response.Message]),
        tap(([id, message]) => {
          this.logService.log('Response: ', message);
          // TODO: question to Ilya
          this.router.navigate(['products']);
        }),
        catchError(error => {
          this.logService.error(error);
          return throwError(error);
        })
      );
  }

  /**
   * Edit product
   * @param id product ID
   */
  editProduct(id: string): Observable<Product> {
    return this.httpClient
      .get<ResponseMessage<IProductHttp>>(`${this.uri}/edit/${id}`)
      .pipe(
        map(response => response.Data),
        switchMap((httpProduct: IProductHttp) => {
          return of(this.convert(httpProduct));
        })
      );
  }

  /**
   * Update exists product
   * @param id product ID
   * @param name product Name
   * @param description product Description
   * @param price product Price
   */
  updateProduct(id: string, name: string, description: string, price: number) {
    const productToUpdate: IProductHttpBase = {
      _id: id,
      ProductName: name,
      ProductPrice: price,
      ProductDescription: description,
    };

    return this.httpClient
      .post<ResponseMessage<string>>(`${this.uri}/update/${id}`, productToUpdate)
      .pipe(
        map(response => response.Message),
        tap(message => {
          this.logService.log('Response: ', message);
        })
      );
  }

  /**
   * Delete product by id
   * @param id product ID
   */
  deleteProduct(id: string): Observable<string> {
    this.logService.info(`Trying to delete the product by id='${id}'`);

    return this
      .httpClient
      .get<ResponseMessage<string>>(`${this.uri}/delete/${id}`)
      .pipe(
        map(response => response.Message),
        tap(message => {
          this.logService.log('Response: ', message);
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
      .get<ResponseMessage<IProductHttp[]>>(`${this.uri}`)
      .pipe(
        map(response => response.Data),
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
