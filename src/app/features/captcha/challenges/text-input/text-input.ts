import { Component, input, OnInit, output } from '@angular/core';
import { Challenge } from '../../../../core/models/challenge';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: 'text-input.html',
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
}
