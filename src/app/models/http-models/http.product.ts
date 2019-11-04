export interface IProductHttpBase {
  _id?: string;
  ProductName: string;
  ProductDescription: string;
  ProductPrice: number;
}

export interface IProductHttp extends IProductHttpBase {
  _id: string;
  __v: string;
}
