import { EModalActions, ModalActions } from '../actions/modal.actions';
import { initialModalState, IModalState } from '../state/modal.state';

export function modalReducer(
  state: IModalState = initialModalState,
  action: ModalActions
): IModalState {
  switch (action.type) {
    case EModalActions.OpenModalSuccess: {
      const message: string = action.payload;
      return {
        ...state,
        message,
        showModal: true,
      };
    }
    case EModalActions.CloseModalSuccess: {
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
