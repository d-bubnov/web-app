export interface IProductHttpBase {
  _id?: string;
  ProductName: string;
  ProductPrice: number;
  ProductDescription: string;
}

export interface IProductHttp extends IProductHttpBase {

}