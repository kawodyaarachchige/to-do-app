import { Injectable } from '@angular/core';

import { Todo } from '../models/todo.model';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private localStorageKey = environment.localStorageKey;

  constructor() { }

  private getTodosFromStorage(): Todo[] {
    const todosJson = localStorage.getItem(this.localStorageKey);
    return todosJson ? JSON.parse(todosJson) : [];
  }

  private saveTodosToStorage(todos: Todo[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(todos));
  }

  getTodos(): Observable<Todo[]> {
    const todos = this.getTodosFromStorage();
    return of(todos).pipe(delay(500)); 
  }

  getTodo(id: number): Observable<Todo> {
    const todos = this.getTodosFromStorage();
    const todo = todos.find(t => t.id === id);
    return todo ? of(todo).pipe(delay(500)) : throwError('Todo not found');
  }

  createTodo(todo: Omit<Todo, 'id'>): Observable<Todo> {
    const todos = this.getTodosFromStorage();
    const newTodo: Todo = {
      ...todo,
      id: this.generateId(todos)
    };
    this.saveTodosToStorage([...todos, newTodo]);
    return of(newTodo).pipe(delay(500));
  }

  updateTodo(id: number, changes: Partial<Todo>): Observable<Todo> {
    const todos = this.getTodosFromStorage();
    const index = todos.findIndex(t => t.id === id);
    
    if (index === -1) {
      return throwError('Todo not found');
    }

    const updatedTodo = { ...todos[index], ...changes };
    const updatedTodos = [...todos];
    updatedTodos[index] = updatedTodo;
    this.saveTodosToStorage(updatedTodos);
    
    return of(updatedTodo).pipe(delay(500));
  }

  deleteTodo(id: number): Observable<boolean> {
    const todos = this.getTodosFromStorage();
    const updatedTodos = todos.filter(t => t.id !== id);
    this.saveTodosToStorage(updatedTodos);
    return of(true).pipe(delay(500));
  }

  private generateId(todos: Todo[]): number {
    return todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;
  }
}