import { createSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { IModalState } from '../state/modal.state';

const modalFromStore = (state: IAppState) => state.modal;

export const selectMessage = createSelector(
  modalFromStore,
  (state: IModalState) => state.message,
);

export const selectShowModal = createSelector(
  modalFromStore,
  (state: IModalState) => state.showModal,
);
