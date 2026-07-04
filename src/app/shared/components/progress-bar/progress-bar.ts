import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'progress-bar.html',
  styleUrl: 'progress-bar.css',
})
export class ProgressBarComponent {
  @Input() current = 0;
  @Input() total = 1;
  get fillPercent(): number {
    return Math.round(((this.current + 1) / this.total) * 100);
  }
}
