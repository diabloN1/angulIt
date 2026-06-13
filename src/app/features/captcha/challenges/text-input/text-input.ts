import { Component, input, OnInit, output } from '@angular/core';
import { Challenge } from '../../../../core/models/challenge';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: 'text-input.html',
  imports: [ReactiveFormsModule],
  styleUrl: 'text-input.html',
})
export class TextInputComponent implements OnInit {
  challenge = input.required<Challenge>();
  showError = input<boolean>(false);
  answerChange = output<string>();

  control = new FormControl('');

  chars: string[] = [];

  ngOnInit(): void {
    this.chars = this.challenge().textTarget!.split('');
  }

  onInput(): void {
    this.answerChange.emit(this.control.value ?? '');
  }

  getCharStyle(index: number): string {
    const rotations = this.shuffle([-8, 6, -4, 10, -6, 4, -10, 8]);
    const colors = this.shuffle([
      'var(--clr-text)',
      'var(--clr-primary-light)',
      'var(--clr-accent)',
      'var(--clr-text)',
      'var(--clr-primary-light)',
      'var(--clr-text)',
      'var(--clr-accent)',
      'var(--clr-text)',
    ]);

    const rot = rotations[index % rotations.length];
    const color = colors[index % colors.length];
    const offset = ((index % 3) - 1) * 3;
    return `transform: rotate(${rot}deg) translateY(${offset}px); color: ${color};`;
  }

  private shuffle<T>(array: T[]): T[] {
    return array.sort(() => Math.random() - 0.5);
  }
}
