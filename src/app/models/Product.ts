
interface IProduct {
  ProductName: string;
  ProductDescription: string;
  ProductPrice: number;
}

class Product implements IProduct {
  // tslint:disable-next-line:variable-name
  _id?: string;
  ProductName: string;
  ProductDescription: string;
  ProductPrice: number;
}

export { Product, IProduct };
