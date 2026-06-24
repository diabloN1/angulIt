import { computed, inject, Injectable, signal } from '@angular/core';
import { SessionState } from '../models/session';
import { ChallengeFactoryService } from './challenge-factory.service';

@Injectable({ providedIn: 'root' })
export class CaptchaStateService {
  private readonly STORAGE_KEY = 'angulIt_session';

  private readonly _session = signal<SessionState | null>(this.load());

  readonly session = this._session.asReadonly();
  readonly currentIndex = computed(() => this._session()?.currentIndex ?? 0);
  readonly challenges = computed(() => this._session()?.challenges ?? []);
  readonly totalChallenges = computed(() => this.challenges().length);
  readonly currentChallenge = computed(() => this.challenges()[this.currentIndex()]);
  readonly isCompleted = computed(() => this._session()?.completed ?? false);
  readonly hasSession = computed(() => this._session() !== null);

  private readonly factory = inject(ChallengeFactoryService);

  startSession(): void {
    const state: SessionState = {
      challenges: this.factory.build(),
      currentIndex: 0,
      completed: false,
    };
    this.save(state);
  }

  private save(state: SessionState): void {
    this._session.set(state);
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
    } catch {
      console.error('Failed to save session to localStorage');
    }
  }

  private load(): SessionState | null {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      return raw ? (JSON.parse(raw) as SessionState) : null;
    } catch {
      console.error('Failed to load session from localStorage');
      return null;
    }
  }
}
