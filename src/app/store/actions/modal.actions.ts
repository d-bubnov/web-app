import { Action } from '@ngrx/store';

export enum EModalActions {
  OpenModal = '[Modal] Open Modal',
  OpenModalSuccess = '[Modal] Open Modal Success',
  CloseModal = '[Modal] Close Modal',
  CloseModalSuccess = '[Modal] Close Modal Success',
}

export class OpenModalAction implements Action {
  readonly type = EModalActions.OpenModal;
  constructor(public payload: string) {}
}

export class CloseModalAction implements Action {
  readonly type = EModalActions.CloseModal;
}

export class OpenModalSuccess implements Action {
  readonly type = EModalActions.OpenModalSuccess;
  constructor(public payload: string) {}
}

export class CloseModalSuccess implements Action {
  readonly type = EModalActions.CloseModalSuccess;
}

export type ModalActions =
  OpenModalAction |
  OpenModalSuccess |
  CloseModalAction |
  CloseModalSuccess;
