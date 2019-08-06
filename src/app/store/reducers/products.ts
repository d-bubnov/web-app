import { SelectProductAction } from '../actions';
import * as types from '../types';

export interface State {
    selected: string;
}

export const initialState: State = {
    selected: '',
};

export function reducer(state = initialState, action: SelectProductAction) {
    switch (action.type) {
        case types.SELECT_PRODUCT: {
            const id: string = action.payload;
            return {
                ...state,
                selected: id,
            };
            break;
        }
        default: {
            return state;
        }
    }
}

export const getSelected = (state: State) => state.selected;
