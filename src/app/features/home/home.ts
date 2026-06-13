import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.html',
  styleUrl: 'home.css',
})
export class HomeComponent {
  private router = inject(Router);

  hasExistingSession = signal(false);

  startSession(): void {
    this.router.navigate(['/captcha']);
  }
}
