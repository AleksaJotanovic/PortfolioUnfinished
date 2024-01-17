import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth.service';
import { CrudService } from '../../../services/crud.service';
import { User } from '../../../../models/user.model';

@Component({
  selector: 'admin-header',
  standalone: true,
  imports: [],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent implements OnInit {

  isLoggedIn: boolean = false;

  user!: User;


  constructor(private cookies: CookieService, private router: Router, private auth: AuthService, private crud: CrudService) { }

  ngOnInit(): void {
    this.auth.isLoggedIn$.subscribe({ next: v => this.isLoggedIn = v });
    this.crud.userGet(String(localStorage.getItem("user_id"))).subscribe(v => this.user = v.data);
  }



  logout() {
    localStorage.removeItem("user_id");
    this.cookies.delete("access_token", "/");

    if (this.auth.isLoggedIn()) {
      this.router.navigate(["admin/login"]);
      this.auth.isLoggedIn$.next(false);
    }

  }



}
