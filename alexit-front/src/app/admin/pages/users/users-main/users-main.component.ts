import { Component, OnInit } from '@angular/core';
import { AlexitService } from '../../../../services/alexit.service';
import { Role } from '../../../../../models/role.model';
import { User } from '../../../../../models/user.model';
import { v4 as uuid } from 'uuid';
import { UsersTableComponent } from '../users-table/users-table.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'users-main',
  standalone: true,
  imports: [UsersTableComponent, RouterLink],
  templateUrl: './users-main.component.html',
  styleUrl: './users-main.component.css'
})
export class UsersMainComponent implements OnInit {

  users: User[] = [];

  roles: Role[] = [];



  constructor(private alexit: AlexitService) { }

  ngOnInit(): void {
    this.init();
  }



  init() {
    this.alexit.users$.subscribe({ next: (val) => this.users = val, error: (err) => console.log(err) });
    this.alexit.roles$.subscribe({ next: (val) => this.roles = val, error: (err) => console.log(err) });
  }

  delete(event: { id: string }) {
    this.alexit.deleteUser(event.id);
  }


}
