import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Component } from '@angular/core';

import { IAppState } from '../store/state/app.state';
import { CloseModalAction } from '../store/actions/modal.actions';
import {
  selectShowModal,
  selectMessage,
} from '../store/selectors/modal.selectors';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.less']
})
export class ModalDialogComponent {

  showModal$: Observable<boolean> = this.store.pipe(select(selectShowModal));
  message$: Observable<string> = this.store.pipe(select(selectMessage));

  constructor(private store: Store<IAppState>) { }

  closeModal() {
    this.store.dispatch(new CloseModalAction());
  }
}
