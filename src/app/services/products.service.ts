import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { switchMap, tap, catchError, map } from 'rxjs/operators';
import { of, Observable, throwError } from 'rxjs';

import { Product } from '../models/product';
import { ResponseMessage } from '../models/http-models/response.message';
import { IProductHttp, IProductHttpBase } from '../models/http-models/http.product';
import { LogService } from './log.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private uri: string = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
    private logService: LogService,
  ) { }

  private convertHttpToModel(product: IProductHttp): Product {
    return new Product(
      product._id,
      product.ProductName,
      product.ProductDescription,
      product.ProductPrice
    );
  }

  /**
   * Cretae new product
   * @param product Product entity to add
   */
  createProduct(product: Product): Observable<boolean> {
    this.logService.info('Trying to add new product');

    const productToAdd: IProductHttpBase = {
      ProductName: product.name,
      ProductPrice: product.price,
      ProductDescription: product.description,
    };

    return this.httpClient
      .post<ResponseMessage<string>>(`${this.uri}/add`, productToAdd)
      .pipe(
        map(response => ({
          message: response.Message,
          success: response.Success,
        })),
        switchMap((result) => {
          this.logService.log('Response: ', result.message);
          return of(result.success);
        }),
        catchError(error => {
          this.logService.error(error);
          return throwError(error);
        }),
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
          const product = this.convertHttpToModel(httpProduct);
          return of(product);
        }),
        catchError(error => {
          this.logService.error(error);
          return throwError(error);
        }),
      );
  }

  /**
   * Update exists product
   * @param id product ID
   * @param name product Name
   * @param description product Description
   * @param price product Price
   */
  updateProduct(id: string, name: string, description: string, price: number): Observable<boolean> {
    const productToUpdate: IProductHttpBase = {
      _id: id,
      ProductName: name,
      ProductPrice: price,
      ProductDescription: description,
    };

    return this.httpClient
      .post<ResponseMessage<string>>(`${this.uri}/update/${id}`, productToUpdate)
      .pipe(
        map(response => ({
          message: response.Message,
          success: response.Success,
        })),
        switchMap((result) => {
          this.logService.log('Response: ', result.message);
          return of(result.success);
        }),
        catchError(error => {
          this.logService.error(error);
          return throwError(error);
        }),
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
        }),
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
          const products: Product[] = httpProducts
            .map((httpProduct: IProductHttp) => this.convertHttpToModel(httpProduct));

          return of(products);
        }),
        catchError(error => {
          this.logService.error(error);
          return throwError(error);
        }),
      );
  }
}
