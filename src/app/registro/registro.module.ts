import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { RegistroRoutingModule } from './registro-routing.module';
import { RegistroComponent } from '../registro/registro.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [RegistroComponent],
  imports: [
    CommonModule,
    RegistroRoutingModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class RegistroModule { }
