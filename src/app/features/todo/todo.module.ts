import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { TodoDetailsComponent } from './todo-details/todo-details.component';
import { TodoRoutingModule } from './todo-routing.module';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    TodoListComponent,
    TodoFormComponent,
    TodoDetailsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TodoRoutingModule,
    SharedModule
  ]
})
export class TodoModule { }