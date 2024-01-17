import { Component, OnInit } from '@angular/core';
import { OrdersTableComponent } from '../orders-table/orders-table.component';
import { AlexitService } from '../../../../services/alexit.service';
import { Order } from '../../../../../models/order.model';

@Component({
  selector: 'orders-main',
  standalone: true,
  imports: [OrdersTableComponent],
  templateUrl: './orders-main.component.html',
  styleUrl: './orders-main.component.css'
})
export class OrdersMainComponent implements OnInit {

  orders: Order[] = [];

  constructor(private alexit: AlexitService) { }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.alexit.orders$.subscribe({
      next: v => {
        this.orders = v.sort((a, b) => new Date(b.creationTime).valueOf() - new Date(a.creationTime).valueOf());
      }, error: (err) => console.log(err)
    });
  }

  delete(event: { id: string }) {
    this.alexit.deleteOrder(event.id)
  }

}
