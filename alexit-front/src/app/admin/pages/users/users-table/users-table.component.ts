import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Role } from '../../../../../models/role.model';
import { User } from '../../../../../models/user.model';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserSearchPipe } from '../../../../pipes/user-search.pipe';
import { RoleFilterPipe } from '../../../../pipes/role-filter.pipe';

@Component({
  selector: 'users-table',
  standalone: true,
  imports: [FormsModule, RouterLink, UserSearchPipe, RoleFilterPipe],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.css'
})
export class UsersTableComponent {

  @Output() onUserDelete = new EventEmitter<{ id: string }>()

  @Output() onUsersInit = new EventEmitter();

  @Input() users: User[] = [];

  @Input() roles: Role[] = [];

  filterRole: string = '';

  filterSearch: string = '';



  emitOnUserDelete(id: string) {
    this.onUserDelete.emit({ id: id });
  }

  emitOnUsersInit() {
    this.onUsersInit.emit();
  }

}
