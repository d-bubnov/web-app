import { ActionReducerMap } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';

import { IAppState } from '../state/app.state';

import { productReducer } from './products.reducers';

export const appReducer: ActionReducerMap<IAppState, any> = {
  router: routerReducer,
  product: productReducer,
};
