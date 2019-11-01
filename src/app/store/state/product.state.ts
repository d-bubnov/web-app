import { IProduct } from '../../models/product';

export interface IProductState {
    products: IProduct[];
    selectedProduct: string;
}

export const initialProductState: IProductState = {
    products: [],
    selectedProduct: '',
};
