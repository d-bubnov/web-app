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
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private logService: LogService,
  ) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Description: ['', Validators.required],
      Price: ['', Validators.required],
    });
  }

  // TODO: pure logic of the component (it is not a dream)
  updateProduct(name: string, description: string, price: number) {
    // TODO:need to use `pipe` with Observable
    this.route.params.subscribe(params => {
      // TODO:need to use dispatch of the action
      this.productsService
        .updateProduct(params.id, name, description, price)
        .subscribe(result => {
          this.logService.log('Updated: ', result);
          this.router.navigate(['products']);
        });
    });
  }

  // TODO: pure logic of the component (it is not a dream)
  ngOnInit() {
    // TODO:need to use `pipe` with Observable
    this.route.params.subscribe(params => {
      // TODO:need to use dispatch of the action
      this.productsService
        .editProduct(params.id)
        .subscribe((product: Product) => {
          const { name, price, description } = product;
          this.angForm.setValue({
            Name: name,
            Price: price,
            Description: description,
          });
        });
    });
  }

}
