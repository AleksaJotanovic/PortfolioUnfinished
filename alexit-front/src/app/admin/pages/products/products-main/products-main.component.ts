import { Component, OnInit } from '@angular/core';
import { ProductsTableComponent } from '../products-table/products-table.component';
import { Category } from '../../../../../models/category.model';
import { Product } from '../../../../../models/product.model';
import { AlexitService } from '../../../../services/alexit.service';

@Component({
  selector: 'products-main',
  standalone: true,
  imports: [ProductsTableComponent],
  templateUrl: './products-main.component.html',
  styleUrl: './products-main.component.css'
})
export class ProductsMainComponent implements OnInit {

  products: Product[] = [];

  categories: Category[] = [];



  constructor(private alexit: AlexitService) {
  }

  ngOnInit(): void {
    this.alexit.products$.subscribe({ next: (val) => this.products = val, error: (err) => console.log(err) });
    this.alexit.categories$.subscribe({ next: (val) => this.categories = val, error: (err) => console.log(err) });
  }



  delete(event: { id: string }) {
    this.alexit.deleteProduct(event.id);
  }


}
