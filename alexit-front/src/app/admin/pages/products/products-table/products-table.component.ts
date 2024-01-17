import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../../../../models/category.model';
import { Product } from '../../../../../models/product.model';
import { FormsModule } from '@angular/forms';
import { CtgIfPipe } from '../../../../pipes/ctg-if.pipe';
import { SearchFilterPipe } from '../../../../pipes/search-filter.pipe';
import { CtgFilterPipe } from '../../../../pipes/ctg-filter.pipe';
import { PublishedFilterPipe } from '../../../../pipes/published-filter.pipe';
import { StockFilterPipe } from '../../../../pipes/stock-filter.pipe';
import { PriceFilterPipe } from '../../../../pipes/price-filter.pipe';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'products-table',
  standalone: true,
  imports: [FormsModule, CtgIfPipe, SearchFilterPipe, CtgFilterPipe, PublishedFilterPipe, StockFilterPipe, PriceFilterPipe, NgStyle, NgIf, RouterLink, NgFor],
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.css'
})
export class ProductsTableComponent {

  @Output() onProductsInit = new EventEmitter();

  @Output() onProductDelete = new EventEmitter<{ id: string }>();

  @Input() products: Product[] = [];

  @Input() categories: Category[] = [];

  categoryFilter: string = '';

  filterString: string = '';
  filterPublished: boolean | null = null;
  filterStock: number | null = null;
  filterPrice: string = '';



  emitOnProductDelete(id: string) {
    this.onProductDelete.emit({ id: id });
  }

  withCommas(number: number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }


}
