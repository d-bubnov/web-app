import { Component } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Product } from '../models/product';
import { IAppState } from '../store/state/app.state';
import { Store } from '@ngrx/store';
import { CreateProductAction } from '../store/actions/products.actions';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.less']
})
export class ProductAddComponent {

  angForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<IAppState>
  ) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.formBuilder.group({
      ProductName: ['', Validators.required ],
      ProductDescription: ['', Validators.required ],
      ProductPrice: ['', Validators.required ]
    });
  }

  addProduct(ProductName: string, ProductDescription: string, ProductPrice: number) {
    const productToAdd = new Product('', ProductName, ProductDescription, ProductPrice);
    this.store.dispatch(new CreateProductAction(productToAdd));
  }

}
