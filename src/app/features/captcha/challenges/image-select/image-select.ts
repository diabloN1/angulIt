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

  
}
