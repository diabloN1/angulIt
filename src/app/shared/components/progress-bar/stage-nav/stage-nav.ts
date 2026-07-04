import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stage-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'stage-nav.html',
  styleUrl: 'stage-nav.css',
})
export class StageNavComponent {
  @Input() canGoBack = false;
  @Input() canGoNext = false;
  @Input() isLast = false;
  @Output() prev = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
}
