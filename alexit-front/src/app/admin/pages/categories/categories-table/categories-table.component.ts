import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Category } from '../../../../../models/category.model';
import { FormsModule } from '@angular/forms';
import { PtIfPipe } from '../../../../pipes/pt-if.pipe';

@Component({
  selector: 'categories-table',
  standalone: true,
  imports: [FormsModule, PtIfPipe],
  templateUrl: './categories-table.component.html',
  styleUrl: './categories-table.component.css'
})
export class CategoriesTableComponent {

  @Input() categories: Category[] = [];
  @Input() editMode!: boolean;

  @ViewChild('name') name!: HTMLTextAreaElement;
  @ViewChild('parent_id') parent_id!: HTMLSelectElement;
  @ViewChild('description') description!: HTMLTextAreaElement;

  @Output() onCategoryUpdate = new EventEmitter<{ id: string; name: string; parent_id: string; description: string; }>();
  @Output() onCategoryDelete = new EventEmitter<{ id: string }>();



  emitOnCategoryDelete(id: string) {
    this.onCategoryDelete.emit({ id: id });
  }
  emitOnCategoryUpdate(id: string, name: string, parent_id: string, description: string) {
    this.onCategoryUpdate.emit({ id: id, name: name, parent_id: parent_id, description: description });
  }

}
