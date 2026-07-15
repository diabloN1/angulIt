import { Component, input, OnInit, output } from '@angular/core';
import { Challenge } from '../../../../core/models/challenge';

@Component({
  selector: 'app-math-challenge',
  templateUrl: 'math.html',
  styleUrl: 'math.css',
})
export class MathChallengeComponent implements OnInit {
  challenge = input.required<Challenge>();
  showError = input(false);
  showInvalid = input(false);
  answerChange = output<number>();

  selectedAnswer: number | null = null;

  ngOnInit(): void {
    const storedAnswer = this.challenge().userAnswer;

    if (storedAnswer && typeof storedAnswer === 'number') {
      this.selectOption(storedAnswer);
    }
  }

  selectOption(value: number): void {
    this.selectedAnswer = value;
    this.answerChange.emit(value);
  }
}
