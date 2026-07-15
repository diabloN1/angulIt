import { Component, computed, effect, input, OnInit, output } from '@angular/core';
import { Challenge } from '../../../../core/models/challenge';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: 'text-input.html',
  imports: [ReactiveFormsModule],
  styleUrl: 'text-input.css',
})
export class TextInputComponent implements OnInit {
  challenge = input.required<Challenge>();
  showError = input<boolean>(false);
  showInvalid = input<boolean>(false);
  answerChange = output<string>();

  control = new FormControl('');

  chars = computed(() => this.challenge().textTarget!.split(''));

  private readonly rotations = this.shuffle([-8, 6, -4, 10, -6, 4, -10, 8]);
  private readonly colors = this.shuffle([
    'var(--clr-text)',
    'var(--clr-primary-light)',
    'var(--clr-accent)',
    'var(--clr-text)',
    'var(--clr-primary-light)',
    'var(--clr-text)',
    'var(--clr-accent)',
    'var(--clr-text)',
  ]);

  constructor() {
    effect(() => {
      const isInvalid = this.showInvalid();
      if (isInvalid) {
        this.control.setValue('');
      }
    });
  }

  ngOnInit(): void {
    const storedAnswer = this.challenge().userAnswer;
    if (typeof storedAnswer == 'string') {
      this.control.setValue(storedAnswer);
    }
  }

  onInput(): void {
    if (this.challenge().completed) return;
    this.answerChange.emit(this.control.value ?? '');
  }

  getCharStyle(index: number): string {
    const rot = this.rotations[index % this.rotations.length];
    const color = this.colors[index % this.colors.length];
    const offset = ((index % 3) - 1) * 3;
    return `transform: rotate(${rot}deg) translateY(${offset}px); color: ${color};`;
  }

  private shuffle<T>(array: T[]): T[] {
    return array.sort(() => Math.random() - 0.5);
  }
}
