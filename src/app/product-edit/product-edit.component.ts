import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Product, IProduct } from '../models/product';
import { IAppState } from '../store/state/app.state';
import { GetProductAction, UpdateProductAction } from '../store/actions/products.actions';
import { selectCurrentProduct } from '../store/selectors/product.selectors';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.less']
})
export class ProductEditComponent implements OnInit {

  id$: Observable<string>;
  product$: Observable<IProduct> = this.store.pipe(select(selectCurrentProduct));
  angForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private store: Store<IAppState>
  ) {
    this.createForm();
    this.id$ = route.params.pipe(map(p => p.id));
  }

  createForm() {
    this.angForm = this.formBuilder.group({
      Id: [''],
      Name: ['', Validators.required],
      Description: ['', Validators.required],
      Price: ['', Validators.required],
    });
  }

  updateProduct(id: string, name: string, description: string, price: number) {
    const productToUpdate = new Product(id, name, description, price);
    this.store.dispatch(new UpdateProductAction(productToUpdate));
  }

  ngOnInit() {
    this.id$
      .subscribe((id: string) =>
        this.store.dispatch(new GetProductAction(id))
      );

    this.product$
      .subscribe((product: Product) => {
        if (product) {
          const { id, name, price, description } = product;
          this.angForm.setValue({
            Id: id,
            Name: name,
            Price: price,
            Description: description,
          });
        }
      });
  }

}
