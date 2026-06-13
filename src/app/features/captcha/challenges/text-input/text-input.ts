import { Component, input, output } from "@angular/core";
import { Challenge } from "../../../../core/models/challenge";

@Component({
  selector: 'app-text-input', 
    templateUrl: 'text-input.html',
    styleUrl: 'text-input.html',
})
export class TextInputComponent {
    challenge = input.required<Challenge>();
    showError = input<boolean>(false);
    answerChange = output<string>();
}