import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from '../../../core/models/todo.model';
import { TodoService } from '../../../core/services/todo.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {
  @Input() todo: Todo | null = null;
  @Output() submitted = new EventEmitter<Todo>();
  
  form: FormGroup;
  isEditMode = false;
  todoId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private todoService: TodoService,
    public router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      dueDate: ['', Validators.required],
      completed: [false]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.todoId = +params['id'];
        this.isEditMode = true;
        this.loadTodo(this.todoId);
      }
    });

    if (this.todo) {
      this.isEditMode = true;
      this.todoId = this.todo.id;
      this.patchForm(this.todo);
    }
  }

  private loadTodo(id: number): void {
    this.todoService.getTodo(id).subscribe(todo => {
      this.patchForm(todo);
    });
  }

  private patchForm(todo: Todo): void {
    this.form.patchValue({
      title: todo.title,
      description: todo.description,
      dueDate: new Date(todo.dueDate).toISOString().substring(0, 10),
      completed: todo.completed
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const formValue = this.form.value;
    const todoData = {
      ...formValue,
      dueDate: new Date(formValue.dueDate)
    };

    if (this.isEditMode && this.todoId) {
      this.todoService.updateTodo(this.todoId, todoData).subscribe({
        next: (updatedTodo) => {
          this.submitted.emit(updatedTodo);
          this.router.navigate(['/todo']);
        },
        error: (err) => {
          console.error('Error updating todo:', err);
        }
      });
    } else {
      this.todoService.createTodo(todoData).subscribe({
        next: (newTodo) => {
          this.submitted.emit(newTodo);
          this.router.navigate(['/todo']);
        },
        error: (err) => {
          console.error('Error creating todo:', err);
        }
      });
    }
  }
}