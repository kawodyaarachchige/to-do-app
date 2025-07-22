import { Component, OnInit } from '@angular/core';
import { Todo } from '../../../core/models/todo';
import { TodoService } from '../../../core/services/todo.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.scss']
})
export class TodoDetailsComponent implements OnInit {
  todo: Todo | null = null;
  loading = true;

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadTodo(id);
  }

  loadTodo(id: number): void {
    this.loading = true;
    this.todoService.getTodo(id).subscribe({
      next: (todo) => {
        this.todo = todo;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.router.navigate(['/todo']);
      }
    });
  }

  deleteTodo(): void {
    if (!this.todo) return;

    if (confirm('Are you sure you want to delete this todo?')) {
      this.todoService.deleteTodo(this.todo.id).subscribe({
        next: () => {
          this.router.navigate(['/todo']);
        }
      });
    }
  }
}