import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'client-main',
  standalone: true,
  imports: [FormsModule, NgxMaskDirective],
  templateUrl: './client-main.component.html',
  styleUrl: './client-main.component.css',
  providers: [provideNgxMask()]
})
export class ClientMainComponent {

}
