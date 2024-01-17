import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../../models/category.model';
import { Product } from '../../../../../models/product.model';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlexitService } from '../../../../services/alexit.service';
import { CtgIfPipe } from '../../../../pipes/ctg-if.pipe';

@Component({
  selector: 'edit-product',
  standalone: true,
  imports: [ReactiveFormsModule, CtgIfPipe],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {


  categories: Category[] = [];

  images: string[] = [];

  productForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    manufacturer: new FormControl(''),
    uom: new FormControl(''),
    sku: new FormControl(''),
    purchasePrice: new FormControl(0),
    margin: new FormControl(0),
    category_id: new FormControl(''),
    specifications: new FormArray([]),
    inStock: new FormControl(0),
    weight: new FormControl(0),
    garantee: new FormControl(''),
    published: new FormControl(false)
  });



  constructor(private route: ActivatedRoute, private alexit: AlexitService, private router: Router) { }

  ngOnInit(): void {
    this.alexit.products$.subscribe({
      next: (value) => {
        const product = value.find((prod) => prod._id === this.route.snapshot.params['id']);
        if (product !== undefined) {
          product.specifications.forEach(() => this.newSpecification());
          this.productForm.patchValue({
            name: product.name,
            manufacturer: product.manufacturer,
            uom: product.uom,
            sku: product.sku,
            purchasePrice: product.price.regular,
            margin: product.margin,
            category_id: product.category._id,
            specifications: product.specifications,
            inStock: product.inStock,
            weight: product.weight,
            garantee: product.garantee,
            published: product.published
          });
          this.images = product.images;
        }
      },
      error: (err) => console.log('Error when subscribing to products: ', err)
    });
    this.alexit.categories$.subscribe({
      next: (value) => this.categories = value,
      error: (err) => console.log(err)
    });
  }

  ngOnDestroy(): void {
    this.productForm.reset();
    this.getSpecifications().clear();
  }



  setImageSrc(event: any, expandedImg: HTMLImageElement) {
    expandedImg.src = event.target.src;
  }


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

  update() {
    const category = this.categories.find(c => c._id === this.productForm.value.category_id);
    if (category !== undefined) {
      const product: Product = {
        ...this.productForm.value,
        _id: this.route.snapshot.params['id'],
        category: { _id: category._id, name: category.name },
      };
      this.alexit.updateProduct(product);
      this.router.navigate(['admin/products']);
    };
  }


}
