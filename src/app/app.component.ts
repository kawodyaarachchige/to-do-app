import { Component } from '@angular/core';

import { Router } from '@angular/router'; // Add this import
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public authService: AuthService,
    private router: Router // Inject Router here
  ) {}

  logout(event: Event) {
    event.preventDefault();
    this.authService.logout();
    this.router.navigate(['/auth/login']); // Now this will work
  }
}