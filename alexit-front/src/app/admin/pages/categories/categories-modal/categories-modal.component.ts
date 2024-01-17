import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../../../../models/category.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CategoriesService } from '../categories.service';
import { PtIfPipe } from '../../../../pipes/pt-if.pipe';

@Component({
  selector: 'categories-modal',
  standalone: true,
  imports: [ReactiveFormsModule, PtIfPipe],
  templateUrl: './categories-modal.component.html',
  styleUrl: './categories-modal.component.css'
})
export class CategoriesModalComponent {

  @Output() onOpen = new EventEmitter<{ modal: HTMLDivElement }>();
  @Output() onClose = new EventEmitter<{ modal: HTMLDivElement }>()

  @Input() categories: Category[] = [];

  @Output() onCategoryAdd = new EventEmitter<{ categoryForm: FormGroup, imageInput: HTMLInputElement }>();

  categoryForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    parent_id: new FormControl('')
  });



  constructor(private ctgService: CategoriesService) { }

  ngOnInit(): void {
    this.ctgService.categoryFormValue$.subscribe(v => this.categoryForm.setValue({
      name: v.name,
      description: v.description,
      parent_id: v.parent_id
    }));
  }




  emitOnOpen(modal: HTMLDivElement) {
    this.onOpen.emit({ modal: modal });
  }
  emitOnClose(modal: HTMLDivElement) {
    this.onClose.emit({ modal: modal });
  }
  emitOnCategoryAdd(imageInput: HTMLInputElement) {
    this.onCategoryAdd.emit({ categoryForm: this.categoryForm, imageInput: imageInput });
  }


}
