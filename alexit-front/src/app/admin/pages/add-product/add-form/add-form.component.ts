import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Category } from '../../../../../models/category.model';
import { CtgIfPipe } from '../../../../pipes/ctg-if.pipe';

@Component({
  selector: 'add-form',
  standalone: true,
  imports: [ReactiveFormsModule, CtgIfPipe],
  templateUrl: './add-form.component.html',
  styleUrl: './add-form.component.css'
})
export class AddFormComponent {

  @Input() categories: Category[] = [];

  @Output() onProductAdd = new EventEmitter<{ productForm: FormGroup, productImages: HTMLInputElement }>();

  productForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    manufacturer: new FormControl(''),
    uom: new FormControl(''),
    sku: new FormControl(''),
    purchasePrice: new FormControl(0),
    margin: new FormControl(0),
    category_id: new FormControl(''),
    specifications: new FormArray([this.putSpecifications()]),
    inStock: new FormControl(0),
    weight: new FormControl(0),
    garantee: new FormControl(''),
    published: new FormControl(false)
  });



  emitProductAdding(productImages: HTMLInputElement) {
    this.onProductAdd.emit({ productForm: this.productForm, productImages: productImages });
  }









  // ------------------------------------------
  // ------------------------------------------
  putSpecifications() {
    return new FormGroup({
      spec: new FormControl(''),
      value: new FormControl('')
    });
  }

  getSpecifications() {
    return this.productForm.get('specifications') as FormArray;
  }

  newSpecification() {
    return this.getSpecifications().push(this.putSpecifications());
  }

  removeSpecification(i: number) {
    this.getSpecifications().removeAt(i);
  }

}
