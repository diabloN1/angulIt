import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CaptchaStateService } from '../../../core/services/captcha-state.service';

@Component({
  selector: 'app-captcha',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: 'captcha.html',
  styleUrl: 'captcha.css',
})
export class CaptchaComponent {
  readonly state = inject(CaptchaStateService);
  private router = inject(Router);

  private _currentAnswer = signal<string | number | number[] | null>(null);
  readonly showError = signal(false);

  readonly hasAnswer = computed(() => {
    const answer = this._currentAnswer();
    if (answer === null) {
      return this.state.currentChallenge()?.userAnswer !== undefined;
    }
    if (Array.isArray(answer)) return (answer as number[]).length > 0;
    if (typeof answer === 'string') return (answer as string).trim().length > 0;
    return answer !== null && answer !== undefined;
  });

  
}
