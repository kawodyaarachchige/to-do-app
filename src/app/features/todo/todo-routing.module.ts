import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { TodoDetailsComponent } from './todo-details/todo-details.component';

const routes: Routes = [
  { path: '', component: TodoListComponent },
  { path: 'new', component: TodoFormComponent },
  { path: ':id', component: TodoDetailsComponent },
  { path: ':id/edit', component: TodoFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule { }