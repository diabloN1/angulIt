import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CaptchaStateService } from '../../core/services/captcha-state.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.html',
  styleUrl: 'home.css',
})
export class HomeComponent {
  private state = inject(CaptchaStateService);
  private router = inject(Router);

  hasExistingSession = computed(() => this.state.hasSession() && !this.state.isCompleted());

  startSession(): void {
    this.state.startSession();
    this.router.navigate(['/captcha']);
  }

  continueSession(): void {
    this.router.navigate(['/captcha']);
  }

  startFresh(): void {
    this.state.resetSession();
    this.state.startSession();
    this.router.navigate(['/captcha']);
  }
}
