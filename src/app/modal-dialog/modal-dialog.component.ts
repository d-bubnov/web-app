import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Component, Renderer2 } from '@angular/core';
import { tap } from 'rxjs/operators';

import { IAppState } from '../store/state/app.state';
import {
  selectShowModal,
  selectMessage,
} from '../store/selectors/modal.selectors';
import { CloseModalAction } from '../store/actions/modal.actions';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.less']
})
export class ModalDialogComponent {

  showModal$: Observable<boolean> = this.store
    .pipe(
      select(selectShowModal),
      tap((showModal) => {
        if (showModal) {
          // body overflow is hidden to hide main scrollbar when modal window is open
          this.renderer.setStyle(document.body, 'overflow', 'hidden');
        } else {
          this.renderer.removeStyle(document.body, 'overflow');
        }
      })
    );

  message$: Observable<string> = this.store
    .pipe(
      select(selectMessage)
    );

  constructor(
    private store: Store<IAppState>,
    private renderer: Renderer2,
  ) { }

  closeModal() {
    this.store.dispatch(new CloseModalAction());
  }
}
