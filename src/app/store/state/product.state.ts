import { IProduct } from '../../models/product';

export interface IProductState {
    products: IProduct[];
    selectedProductId: string;
    currentProduct: IProduct;
}

export const initialProductState: IProductState = {
    products: [],
    currentProduct: null,
    selectedProductId: '',
};
