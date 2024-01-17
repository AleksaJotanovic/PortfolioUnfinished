import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Order } from '../../../../../models/order.model';

@Component({
  selector: 'orders-table',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './orders-table.component.html',
  styleUrl: './orders-table.component.css'
})
export class OrdersTableComponent {

  @Output() onOrderDelete = new EventEmitter<{ id: string }>();

  @Input() orders: Order[] = [];



  emitOnOrderDelete(id: string) {
    this.onOrderDelete.emit({ id: id });
  }

  toDate(val: string) {
    return new Date(val).toLocaleDateString();
  }
  withCommas(number: number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

}
