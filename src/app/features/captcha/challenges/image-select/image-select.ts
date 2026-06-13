import { Component, EventEmitter, input, Input, output, Output } from '@angular/core';
import { Challenge } from '../../../../core/models/challenge';

@Component({
  selector: 'app-image-select',
  templateUrl: 'image-select.html',
  styleUrl: 'image-select.html',
})
export class ImageSelectComponent {
  challenge = input.required<Challenge>();
  showError = input(false);
  answerChange = output<number[]>();

  selectedIds: number[] = [];

  toggleImage(id: number): void {
    const idx = this.selectedIds.indexOf(id);
    this.selectedIds =
      idx === -1 ? [...this.selectedIds, id] : this.selectedIds.filter((i) => i !== id);
    this.answerChange.emit(this.selectedIds);
  }

  isSelected(id: number): boolean {
    return this.selectedIds.includes(id);
  }
}

