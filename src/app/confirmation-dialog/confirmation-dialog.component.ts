import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: [
    '../modal.theme.less',
    './confirmation-dialog.component.less',
  ],
})
export class ConfirmationDialogComponent {

  public confirmationMessage: string;

  constructor(private dialogRef: MatDialogRef<ConfirmationDialogComponent>) { }

}
