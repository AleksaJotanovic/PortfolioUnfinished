import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../models/category.model';
import { Product } from '../../../../models/product.model';
import { AlexitService } from '../../../services/alexit.service';
import { FormGroup } from '@angular/forms';
import { AddFormComponent } from './add-form/add-form.component';
import { countEarning, countRegularPrice, countSalePrice } from '../../../../middlewares/library';

@Component({
  selector: 'add-product',
  standalone: true,
  imports: [AddFormComponent],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {

  categories: Category[] = [];



  constructor(private alexit: AlexitService) { }

  ngOnInit(): void {
    this.alexit.categories$.subscribe({ next: v => this.categories = v, error: e => console.log(e) });
  }



  add(event: { productForm: FormGroup, productImages: HTMLInputElement }) {
    const files = event.productImages.files as FileList
    const formdata = new FormData();
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      formdata.append("files", file);
    }
    const categoryFilter = this.categories.find((ctg) => ctg._id === event.productForm.get('category_id')?.value)
    if (categoryFilter !== undefined) {
      const purchasePrice = event.productForm.value.purchasePrice;
      const margin = event.productForm.value.margin;
      const productBody: Product = {
        ...event.productForm.value,
        category: { _id: categoryFilter?._id, name: categoryFilter?.name },
        price: {
          purchase: purchasePrice,
          regular: countRegularPrice(margin, purchasePrice),
          sale: countSalePrice(countRegularPrice(margin, purchasePrice)),
          earning: countEarning(margin, countRegularPrice(margin, purchasePrice))
        }
      };
      this.alexit.addProduct(productBody, formdata);
      event.productForm.reset();
    }

  }

  count(value: any) {
    const x = Number(value);
    const regularPrice = x / 1.2;
    const purchasePrice = regularPrice / 1.3;
    console.log(Math.round(purchasePrice));
  }

}
