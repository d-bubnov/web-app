import { RouterReducerState } from '@ngrx/router-store';

import { IProductState, initialProductState } from './product.state';
import { IModalState, initialModalState } from './modal.state';

export interface IAppState {
  router?: RouterReducerState;
  products: IProductState;
  modal: IModalState;
}

export const initialAppState: IAppState = {
  products: initialProductState,
  modal: initialModalState,
};

export function getInitialState(): IAppState {
  return initialAppState;
}
