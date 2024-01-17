import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlexitService } from '../../../services/alexit.service';
import { Courier } from '../../../../models/courier.model';
import { Order } from '../../../../models/order.model';
import { Product } from '../../../../models/product.model';
import { User } from '../../../../models/user.model';
import { RoleFilterPipe } from '../../../pipes/role-filter.pipe';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { areObjectsEqual } from '../../../../middlewares/library';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [ReactiveFormsModule, RoleFilterPipe, FormsModule, NgxMaskDirective],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  providers: [provideNgxMask()]
})
export class CartComponent implements OnInit {

  users: User[] = [];

  couriers: Courier[] = [];

  products: Product[] = [];

  orders: Order[] = [];

  roleUser: string = 'Customer';

  $quantity!: number;

  cartForm: FormGroup = new FormGroup({
    user_id: new FormControl(''),
    courier_id: new FormControl(''),
    pcBuild: new FormControl(null),
    pcBuildName: new FormControl(''),
    product_id: new FormControl(''),
    items: new FormArray([]),
    usernote: new FormControl(''),
    creditCard: new FormGroup({
      number: new FormControl(''),
      expiryDate: new FormControl(''),
      cvv: new FormControl('')
    })
  });



  constructor(private alexit: AlexitService) { }

  ngOnInit(): void {
    this.alexit.users$.subscribe({ next: (val) => this.users = val, error: (err) => console.log(err) });
    this.alexit.couriers$.subscribe({ next: (val) => this.couriers = val, error: (err) => console.log(err) });
    this.alexit.products$.subscribe({ next: (val) => this.products = val, error: (err) => console.log(err) });
    this.alexit.initOrders();
    this.alexit.orders$.subscribe({ next: (val) => this.orders = val, error: (err) => console.log(err) });
  }



  putItems() {
    return new FormGroup({
      product_id: new FormControl(''),
      image: new FormControl(''),
      name: new FormControl(''),
      quantity: new FormControl(0),
      price: new FormControl(0),
      weight: new FormControl(0),
    });
  }

  getItems() {
    return this.cartForm.get('items') as FormArray;
  }

  newItem() {
    return this.getItems().push(this.putItems());
  }

  removeItem(i: number) {
    this.getItems().removeAt(i);
  }


  initItems() {
    this.newItem();
    const productFind = this.products.find((prod) => prod._id === this.cartForm.get('product_id')?.value);
    const item = this.getItems().at(this.getItems().length - 1);

    if (productFind !== undefined) {
      item.setValue({
        product_id: productFind._id,
        image: productFind.images[0],
        name: productFind.name,
        quantity: this.$quantity,
        price: productFind.price.sale * this.$quantity,
        weight: productFind.weight * this.$quantity
      });
    }
  }



  sendToOrder() {
    const val = this.cartForm.value;

    const totalWeight = val.items.reduce((prev: number, cur: any) => prev + cur.weight, 0);
    const totalPrice = val.items.reduce((prev: number, cur: any) => prev + cur.price, 0);
    const userFind = this.users.find((usr) => usr._id === this.cartForm.get('user_id')?.value);
    const courierFind = this.couriers.find((crr) => crr._id === this.cartForm.get('courier_id')?.value);
    const cashierFind = this.users.find((usr) => usr.role.name === "Cashier");

    const randomRange = Math.floor(Math.random() * 1000) + 1000;
    const duplicate: any = this.orders.find(o => o.number === String(randomRange));
    const orderNumber = () => {
      let random: number = 0;
      if (!this.orders.includes(duplicate)) {
        random = randomRange;
      } else if (this.orders.includes(duplicate)) {
        random = randomRange * 10;
      }
      return String(random);
    };

    if (userFind !== undefined && courierFind !== undefined && cashierFind !== undefined) {
      const priceFind: any = courierFind.pricelist.find((pr) => (pr.weight.min < totalWeight && pr.weight.max > totalWeight));
      const newOrder: any = {
        number: orderNumber(),
        user: { _id: userFind._id, username: userFind.username, note: val.usernote },
        courier: { _id: courierFind._id, name: courierFind.name },
        pcBuild: val.pcBuild,
        pcBuildName: val.pcBuildName,
        status: this.alexit.orderStatusList[0].value,
        paid: false,
        shipping: userFind.shippingAddress,
        items: val.items,
        weight: totalWeight % 1 !== 0 ? totalWeight.toFixed(1) : totalWeight,
        subtotal: totalPrice,
        shippingCost: priceFind.price,
        grandTotal: totalPrice + priceFind.price,
        creationTime: String(new Date()),
      };
      if (areObjectsEqual(userFind.creditCard, this.cartForm.value.creditCard)) {
        this.alexit.addOrder({ ...newOrder, paid: true });
      } else {
        console.log('not your credit card!');
      };
    };
  }



}
