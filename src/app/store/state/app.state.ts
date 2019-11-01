import { RouterReducerState } from '@ngrx/router-store';

import { IProductState, initialProductState } from './product.state';

export interface IAppState {
  router?: RouterReducerState;
  product: IProductState;
}

export const initialAppState: IAppState = {
  product: initialProductState,
};

export function getInitialState(): IAppState {
  return initialAppState;
}
