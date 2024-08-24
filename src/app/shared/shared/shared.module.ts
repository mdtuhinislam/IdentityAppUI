import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ValidationMessageComponent } from '../components/errors/validation-message/validation-message.component';
import { NotFoundComponent } from '../components/errors/not-found/not-found.component';



@NgModule({
  declarations: [
    NotFoundComponent,
    ValidationMessageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,

  ],
  exports:[
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class SharedModule { }
