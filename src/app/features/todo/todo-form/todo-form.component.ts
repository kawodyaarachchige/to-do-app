import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Todo } from '../../../core/models/todo.model';
import { TodoService } from '../../../core/services/todo.service';
import { debounceTime } from 'rxjs/operators';

const FORM_STATE_KEY = 'todoFormState';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit, OnDestroy {
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

    this.setupFormListeners();
  }

  ngOnInit(): void {
    const params = this.route.snapshot.params;

    if (params['id']) {
      this.todoId = +params['id'];
      this.isEditMode = true;
      this.loadTodo(this.todoId);
    } else {
      const savedState = localStorage.getItem(FORM_STATE_KEY);
      if (savedState) {
        try {
          this.form.patchValue(JSON.parse(savedState));
        } catch (e) {
          console.error('Error parsing saved form state', e);
        }
      }
    }

    if (this.todo) {
      this.isEditMode = true;
      this.todoId = this.todo.id;
      this.patchForm(this.todo);
    }
  }

  private setupFormListeners(): void {
    this.form.valueChanges
      .pipe(debounceTime(500))
      .subscribe(value => {
        if (!this.isEditMode) {
          localStorage.setItem(FORM_STATE_KEY, JSON.stringify(value));
        }
      });
  }

  private loadTodo(id: number): void {
    this.todoService.getTodo(id).subscribe(todo => this.patchForm(todo));
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

    localStorage.removeItem(FORM_STATE_KEY); // Clean up

    if (this.isEditMode && this.todoId) {
      this.todoService.updateTodo(this.todoId, todoData).subscribe({
        next: (updatedTodo) => {
          this.submitted.emit(updatedTodo);
          this.router.navigate(['/todo']);
        },
        error: (err) => console.error('Error updating todo:', err)
      });
    } else {
      this.todoService.createTodo(todoData).subscribe({
        next: (newTodo) => {
          this.submitted.emit(newTodo);
          this.router.navigate(['/todo']);
        },
        error: (err) => console.error('Error creating todo:', err)
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/todo']);
  }

  ngOnDestroy(): void {
    localStorage.removeItem(FORM_STATE_KEY);
  }
}