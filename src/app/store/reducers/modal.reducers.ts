import { EModalActions, ModalActions } from '../actions/modal.actions';
import { initialModalState, IModalState } from '../state/modal.state';
import { Action } from '@ngrx/store';

// TODO: temporary solution for gettin `payload` property
interface ExtendedActionType extends Action {
  payload?: any;
}

// TODO: I can't use `ModalActions` type here. It's not cool!
export function modalReducer(
  state: IModalState = initialModalState,
  action: ExtendedActionType // I want to use `ModalActions` type here!
): IModalState {
  switch (action.type) {
    case EModalActions.OpenModal: {
      const message: string = action.payload;
      return {
        ...state,
        message,
        showModal: true,
      };
    }
    case EModalActions.CloseModal: {
      return {
        ...state,
        showModal: false,
        message: '',
      };
    }
    default: {
      return state;
    }
  }
}
