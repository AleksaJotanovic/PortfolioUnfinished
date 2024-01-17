import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../../models/category.model';
import { Courier } from '../../models/courier.model';
import { Order } from '../../models/order.model';
import { Product } from '../../models/product.model';
import { Role } from '../../models/role.model';
import { Sale } from '../../models/sale.model';
import { User } from '../../models/user.model';
import { CrudService } from './crud.service';
import { AuthService } from '../admin/services/auth.service';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AlexitService {

  categories$ = new BehaviorSubject<Category[]>([]);

  products$ = new BehaviorSubject<Product[]>([]);

  users$ = new BehaviorSubject<User[]>([]);

  orders$ = new BehaviorSubject<Order[]>([]);

  roles$ = new BehaviorSubject<Role[]>([]);

  couriers$ = new BehaviorSubject<Courier[]>([]);

  sales$ = new BehaviorSubject<Sale[]>([]);

  pageViews$ = new BehaviorSubject<number>(0);

  userAllowed: any = !!this.cookies.get("access_token") ? jwtDecode(this.cookies.get("access_token")) : null;

  orderStatusList = [
    { id: 1, value: "Pending" },
    { id: 2, value: "AwaitingPayment" },
    { id: 3, value: "AwaitingFulfillment" },
    { id: 4, value: "AwaitingShipment" },
    { id: 5, value: "AwaitingPickup" },
    { id: 6, value: "PartiallyShipped" },
    { id: 7, value: "Completed" },
    { id: 8, value: "Shipped" },
    { id: 9, value: "Cancelled" },
    { id: 10, value: "Declined" },
    { id: 11, value: "Refunded" },
    { id: 12, value: "Disputed" }
  ];



  constructor(private crud: CrudService, private auth: AuthService, private cookies: CookieService) { }



  // Kategorije
  initCategories() {
    this.crud.categoriesGet().subscribe((res) => this.categories$.next(res.data));
  }
  addCategory(category: Category, file: FormData) {
    this.crud.categoryImageUpload(file).subscribe((res: any) => {
      let categoryBody: Category = { ...category, image: `http://localhost:3000/categories/${res.data}` };
      this.crud.categoryPost(categoryBody).subscribe(() => this.initCategories());
    });
  }
  updateCategory(category: any) {
    this.crud.categoryPut(category).subscribe(() => this.initCategories());
  }
  deleteCategory(id: string) {
    this.crud.categoryDelete(id).subscribe(() => this.initCategories());
  }


  // Proizvodi
  initProducts() {
    this.crud.productsGet().subscribe((res) => this.products$.next(res.data));
  }
  addProduct(product: Product, formdata: FormData) {
    this.crud.productImagesUpload(formdata).subscribe((res: any) => {
      const productBody: Product = { ...product, images: res };
      this.crud.productPost(productBody).subscribe(() => this.initProducts());
    });
  }
  updateProduct(product: Product) {
    this.crud.productPut(product).subscribe(() => this.initProducts());
  }
  deleteProduct(id: string) {
    this.crud.productDelete(id).subscribe(() => this.initProducts());
  }


  // Users
  initUsers() {
    this.crud.usersGet().subscribe((res) => this.users$.next(res.data));
  }
  addUser(user: User) {
    this.crud.userPost(user).subscribe(() => this.initUsers());
  }
  updateUser(user: User) {
    this.crud.userPut(user).subscribe(() => this.initUsers());
  }
  deleteUser(id: string) {
    this.crud.userDelete(id).subscribe(() => this.initUsers());
  }

  // Orders.
  initOrders() {
    this.crud.ordersGet().subscribe((res) => this.orders$.next(res.data));
  }
  addOrder(order: Order | any) {
    this.crud.orderPost(order).subscribe(() => this.initOrders());
  }
  updateOrder(order: Order) {
    this.crud.orderPut(order).subscribe(() => this.initOrders());
  }
  deleteOrder(id: string) {
    this.crud.orderDelete(id).subscribe(() => this.initOrders());
  }

  mailOrderStatus(mailObj: any) {
    this.crud.orderMailPost(mailObj).subscribe((val) => console.log(val))
  }
  sendAccounting(orderId: string, accounting: string) {
    this.crud.accountingPost(orderId, accounting).subscribe((val) => console.log(val));
  }


  // Couriers
  initCouriers() {
    this.crud.couriersGet().subscribe((res) => this.couriers$.next(res.data));
  }
  addCourier(courier: Courier) {
    this.crud.courierPost(courier).subscribe((res) => this.initCouriers());
  }
  deleteCourier(id: string) {
    this.crud.courierDelete(id).subscribe((res) => this.initCouriers());
  }

  //Sales
  initSales() {
    this.crud.salesGet().subscribe((res) => this.sales$.next(res.data));
  }
  addSale(sale: any) {
    this.crud.salesPost(sale).subscribe(() => this.initSales());
  }

  //Page Views
  initPageViews() {
    this.crud.pageViewsGet().subscribe(res => this.pageViews$.next(res.data.views));
  }
  updatePageViews(pageView: number) {
    this.crud.pageViewsPut(pageView).subscribe(() => this.initPageViews());
  }

  initRoles() {
    this.crud.rolesGet().subscribe(res => this.roles$.next(res.data));
  };
}
