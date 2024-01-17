import { Component, OnInit } from '@angular/core';
import { ClientHeaderComponent } from './components/client-header/client-header.component';
import { ClientFooterComponent } from './components/client-footer/client-footer.component';
import { RouterOutlet } from '@angular/router';
import { AlexitService } from '../services/alexit.service';
import { CrudService } from '../services/crud.service';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'client',
  standalone: true,
  imports: [ClientHeaderComponent, ClientFooterComponent, RouterOutlet, NgStyle],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit {
  pageViews: number = 0;

  constructor(private alexit: AlexitService, private crud: CrudService) { }

  ngOnInit(): void {
    this.alexit.initCategories();
    this.alexit.initCouriers();
    this.alexit.initProducts();
    this.alexit.initUsers();
    this.alexit.pageViews$.subscribe({
      next: v => {
        this.pageViews = v;
        if (this.pageViews !== 0) {
          this.pageViews = this.pageViews + 1
          this.crud.pageViewsPut(this.pageViews).subscribe(() => console.log('posted'))
        }
      }
    });
  }
}
