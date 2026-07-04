import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CaptchaStateService } from '../../core/services/captcha-state.service';
import { Challenge } from '../../core/models/challenge';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'result.html',
  styleUrl: 'result.css',
})
export class ResultComponent implements OnInit {
  private stateService = inject(CaptchaStateService);
  private router = inject(Router);

  readonly challenges = this.stateService.challenges;

  readonly correctCount = () => this.challenges().filter(c => c.isCorrect).length;
  readonly totalCount = () => this.challenges().length;
  readonly score = () => this.correctCount() / this.totalCount();
  readonly isPerfect = () => this.correctCount() === this.totalCount();

  confettiParticles: string[] = [];

  ngOnInit(): void {
    if (this.isPerfect()) {
      this.generateConfetti();
    }
  }

  typeLabel(c: Challenge): string {
    const map: Record<string, string> = {
      'image-select': '🖼️ Image Select',
      'math': '🔢 Math',
      'text-input': '🔤 Text Input',
    };
    return map[c.type] ?? c.type;
  }

  restart(): void {
    this.stateService.resetSession();
    this.stateService.startSession();
    this.router.navigate(['/captcha']);
  }

  goHome(): void {
    this.stateService.resetSession();
    this.router.navigate(['/']);
  }

  private generateConfetti(): void {
    const colors = ['#7c3aed', '#06b6d4', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6'];
    this.confettiParticles = Array.from({ length: 50 }, () => {
      const left = Math.random() * 100;
      const delay = Math.random() * 3;
      const duration = 2.5 + Math.random() * 2;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = 6 + Math.random() * 8;
      return `left:${left}%;top:-20px;background:${color};width:${size}px;height:${size}px;animation-delay:${delay}s;animation-duration:${duration}s`;
    });
  }
}
