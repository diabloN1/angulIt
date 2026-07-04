import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CaptchaStateService } from '../../core/services/captcha-state.service';
import { ImageSelectComponent } from './challenges/image-select/image-select';
import { MathChallengeComponent } from './challenges/math/math';
import { TextInputComponent } from './challenges/text-input/text-input';
import { ProgressBarComponent } from '../../shared/components/progress-bar/progress-bar';
import { StageNavComponent } from '../../shared/components/progress-bar/stage-nav/stage-nav';

@Component({
  selector: 'app-captcha',
  standalone: true,
  imports: [
    CommonModule,
    StageNavComponent,
    ProgressBarComponent,
    ImageSelectComponent,
    MathChallengeComponent,
    TextInputComponent,
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

  readonly isLast = computed(() => this.state.currentIndex() === this.state.totalChallenges() - 1);

  onAnswer(answer: string | number | number[]): void {
    this._currentAnswer.set(answer);
    this.showError.set(false);
  }

  onPrev(): void {
    this._currentAnswer.set(null);
    this.showError.set(false);
    this.state.goToIndex(this.state.currentIndex() - 1);
  }

  onNext(): void {
    const answer = this._currentAnswer() ?? this.state.currentChallenge()?.userAnswer;
    if (
      answer === undefined ||
      answer === null ||
      (Array.isArray(answer) && (answer as number[]).length === 0) ||
      (typeof answer === 'string' && !(answer as string).trim())
    ) {
      this.showError.set(true);
      return;
    }

    this.state.submitAnswer(answer!);
    this._currentAnswer.set(null);
    this.showError.set(false);

    if (this.isLast()) {
      this.state.completeSession();
      this.router.navigate(['/result']);
    } else {
      this.state.advanceIndex();
    }
  }
}
