import { Component, effect, input, OnInit, output, signal, WritableSignal } from '@angular/core';
import { Challenge } from '../../../../core/models/challenge';

@Component({
  selector: 'app-image-select',
  templateUrl: 'image-select.html',
  styleUrl: 'image-select.css',
})
export class ImageSelectComponent implements OnInit {
  challenge = input.required<Challenge>();
  showError = input(false);
  showInvalid = input(false);
  answerChange = output<number[]>();

  selectedIds: WritableSignal<number[]> = signal([]);

  constructor() {
    effect(() => {
      const isInvalid = this.showInvalid();
      if (isInvalid) {
        this.selectedIds.set([]);
      }
    });
  }

  ngOnInit(): void {
    const storedAnswer = this.challenge().userAnswer;

    if (Array.isArray(storedAnswer) && storedAnswer.every((item) => typeof item === 'number')) {
      this.selectedIds.set(storedAnswer);
    }
  }

  toggleImage(id: number): void {
    const idx = this.selectedIds().indexOf(id);
    this.selectedIds.update((old) => (idx === -1 ? [...old, id] : old.filter((i) => i !== id)));
    this.answerChange.emit(this.selectedIds());
  }

  isSelected(id: number): boolean {
    return this.selectedIds().includes(id);
  }
}
