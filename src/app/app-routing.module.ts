import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { UnsavedChangesGuard } from './core/guards/unsaved-changes.guard';
import { TodoFormComponent } from './features/todo/todo-form/todo-form.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'new',
    component: TodoFormComponent,
    canDeactivate: [UnsavedChangesGuard],
  },
  {
    path: 'edit/:id',
    component: TodoFormComponent,
    canDeactivate: [UnsavedChangesGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'todo',
    loadChildren: () =>
      import('./features/todo/todo.module').then((m) => m.TodoModule),
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
