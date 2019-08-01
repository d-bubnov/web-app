import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.less']
})
export class ProductAddComponent implements OnInit {

  angForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private productService: ProductsService) {
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
    this.productService.addProduct(ProductName, ProductDescription, ProductPrice);
  }

  ngOnInit() {
  }

}
