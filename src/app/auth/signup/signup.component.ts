import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
  if (this.signupForm.invalid) {
    return;
  }

  const { name, email, password } = this.signupForm.value;

  this.authService.register(name, email, password).subscribe(success => {
    if (success) {
      this.successMessage = 'Registration successful! Redirecting...';
      this.errorMessage = '';

      setTimeout(() => {
        this.router.navigate(['/']);
      }, 1500);
    } else {
      this.errorMessage = 'Email already exists';
      this.successMessage = '';
    }
  }, error => {
    this.errorMessage = 'An error occurred during registration.';
    console.error(error);
  });
}

}