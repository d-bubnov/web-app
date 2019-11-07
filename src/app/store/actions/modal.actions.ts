import { Action } from '@ngrx/store';

export enum EModalActions {
  OpenModal = '[Modal] Open Modal',
  CloseModal = '[Modal] Close Modal',
}

export class OpenModalAction implements Action {
  readonly type: string = EModalActions.OpenModal;
  constructor(public payload: string) {}
}

export class CloseModalAction implements Action {
  readonly type: string = EModalActions.CloseModal;
}

export type ModalActions =
  OpenModalAction |
  CloseModalAction;
