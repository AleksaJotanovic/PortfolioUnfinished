import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  categoryFormValue$ = new BehaviorSubject<{ name: string, description: string, parent_id: string }>({ name: '', description: '', parent_id: '' });

  constructor() { }

  setCategoryFormValue(value: { name: string, description: string, parent_id: string }) {
    this.categoryFormValue$.next(value);
  }


}
