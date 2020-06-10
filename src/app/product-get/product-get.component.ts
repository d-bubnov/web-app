import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  SelectProductAction,
  GetProductsAction,
  DeleteProductAction,
} from '../store/actions/products.actions';

import { selectProductId, selectProducts } from '../store/selectors/product.selectors';
import { IAppState } from '../store/state/app.state';
import { IProduct } from '../models/product';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-product-get',
  templateUrl: './product-get.component.html',
  styleUrls: ['./product-get.component.less']
})
export class ProductGetComponent implements OnInit {

  products$: Observable<IProduct[]> = this.store.pipe(select(selectProducts));
  selected$: Observable<string> = this.store.pipe(select(selectProductId));

  constructor(private store: Store<IAppState>, private dialog: MatDialog) {}

  deleteProduct(id: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    const  dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);
    dialogRef.componentInstance.confirmationMessage = 'Do you really want to delete this product?';
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new DeleteProductAction(id));
      } else {
        console.log('You do not want to delete this product');
      }
    });
  }

  selectRow(id: string) {
    this.store.dispatch(new SelectProductAction(id));
  }

  ngOnInit() {
    this.store.dispatch(new GetProductsAction());
  }

}
