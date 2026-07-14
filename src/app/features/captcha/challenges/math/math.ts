import { Component, input, output } from '@angular/core';
import { Challenge } from '../../../../core/models/challenge';

@Component({
  selector: 'app-math-challenge',
  templateUrl: 'math.html',
  styleUrl: 'math.css',
})
export class MathChallengeComponent {
  challenge = input.required<Challenge>();
  showError = input(false);
  showInvalid = input(false);
  answerChange = output<number>();

  selectedAnswer: number | null = null;

  selectOption(value: number): void {
    this.selectedAnswer = value;
    this.answerChange.emit(value);
  }
}
