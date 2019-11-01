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
      ProductName: ['', Validators.required],
      ProductDescription: ['', Validators.required],
      ProductPrice: ['', Validators.required],
    });
  }

  updateProduct(ProductName: string, ProductDescription: string, ProductPrice: number) {
    this.route.params.subscribe(params => {
      this.productsService
        .updateProduct(ProductName, ProductDescription, ProductPrice, params.id)
        .subscribe(result => {
          this.logService.write(result, `Updated: `);
          this.router.navigate(['products']);
        });
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productsService.editProduct(params.id).subscribe(productObject => {
        const { ProductName, ProductPrice, ProductDescription } = productObject as Product;
        this.angForm.get('ProductName').setValue(ProductName);
        this.angForm.get('ProductPrice').setValue(ProductPrice);
        this.angForm.get('ProductDescription').setValue(ProductDescription);
      });
    });
  }

}
