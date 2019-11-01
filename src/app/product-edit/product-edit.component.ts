import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { Product } from '../models/product';
import { LogService } from '../services/log.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.less']
})
export class ProductEditComponent implements OnInit {

  angForm: FormGroup;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _productsService: ProductsService,
    private _logService: LogService,
  ) {
    this.createForm();
  }

  createForm() {
    this.angForm = this._formBuilder.group({
      Name: ['', Validators.required],
      Description: ['', Validators.required],
      Price: ['', Validators.required],
    });
  }

  updateProduct(name: string, description: string, price: number) {
    this._route.params.subscribe(params => {
      this._productsService
        .updateProduct(params.id, name, description, price)
        .subscribe(result => {
          this._logService.write(result, `Updated: `);
          this._router.navigate(['products']);
        });
    });
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this._productsService
        .editProduct(params.id)
        .subscribe((product: Product) => {
          const { name, price, description } = product;
          this.angForm.get('Name').setValue(name);
          this.angForm.get('Price').setValue(price);
          this.angForm.get('Description').setValue(description);
        });
    });
  }

}
