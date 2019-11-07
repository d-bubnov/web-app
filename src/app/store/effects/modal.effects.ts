import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import { of } from 'rxjs';

import {
  OpenModalAction,
  EModalActions,
  CloseModalAction,
  OpenModalSuccess,
  CloseModalSuccess,
} from '../actions/modal.actions';

@Injectable()
export class ModalEffects {
  private renderer: Renderer2;

  constructor(
    private actions$: Actions,
    rendererFactory: RendererFactory2,
  ) {
    // Creates and initializes a custom renderer instance for a host DOM element
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  @Effect()
  openModal$ = this.actions$
    .pipe(
      ofType<OpenModalAction>(EModalActions.OpenModal),
      map(action => action.payload),
      switchMap((message: string) => {
        // body overflow is hidden to hide main scrollbar when modal window is open
        this.renderer.setStyle(document.body, 'overflow', 'hidden');
        return of( new OpenModalSuccess(message));
      }),
    );

  @Effect()
  closeModal$ = this.actions$
    .pipe(
      ofType<CloseModalAction>(EModalActions.CloseModal),
      switchMap(() => {
        this.renderer.removeStyle(document.body, 'overflow');
        return of(new CloseModalSuccess());
      }),
    );
}
