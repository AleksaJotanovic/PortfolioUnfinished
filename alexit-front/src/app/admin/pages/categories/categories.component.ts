import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../models/category.model';
import { AlexitService } from '../../../services/alexit.service';
import { CategoriesFormComponent } from './categories-form/categories-form.component';
import { CategoriesTableComponent } from './categories-table/categories-table.component';
import { FormGroup } from '@angular/forms';
import { CategoriesModalComponent } from './categories-modal/categories-modal.component';

@Component({
  selector: 'categories',
  standalone: true,
  imports: [CategoriesFormComponent, CategoriesTableComponent, CategoriesModalComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = [];

  editMode: boolean = false;

  id: string = '';



  constructor(private alexit: AlexitService) { }

  ngOnInit(): void {
    this.alexit.categories$.subscribe({ next: v => this.categories = v, error: e => console.log(e) });
  }



  add(e: { categoryForm: FormGroup, imageInput: HTMLInputElement }) {
    const imageBlob = e.imageInput.files as FileList;
    const file = new FormData();
    file.set('file', imageBlob[0]);

    const form = e.categoryForm.value;
    const parent = this.categories.find(c => c._id === form.parent_id);
    if (parent !== undefined) {
      const category: any = {
        name: form.name,
        parent: { _id: parent._id, name: parent.name },
        description: form.description,
      };
      this.alexit.addCategory(category, file);
    };
  }

  delete(e: { id: string }) {
    this.alexit.deleteCategory(e.id);
  }

  update(e: { id: string; name: string; parent_id: string; description: string }) {
    const parent = this.categories.find(c => c._id === e.parent_id);
    const category: any = {
      _id: e.id,
      name: e.name,
      parent: parent !== undefined ? { _id: parent._id, name: parent.name } : { _id: '', name: '' },
      description: e.description
    };
    this.alexit.updateCategory(category);
    this.editMode = false;
  }

  open(e: { modal: HTMLDivElement }) {
    e.modal.style.display = "block";
  }
  close(e: { modal: HTMLDivElement }) {
    e.modal.style.display = "none";
  }

}
