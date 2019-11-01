export interface IProduct {
  id?: string;
  name: string;
  description: string;
  price: number;
}

export class Product implements IProduct {
  public name: string;
  public description: string;
  public price: number;
  public id?: string;

  public constructor(
    id: string,
    name: string,
    description: string,
    price: number
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
  }
}
