import { computed, inject, Injectable, signal } from '@angular/core';
import { SessionState } from '../models/session';
import { ChallengeFactoryService } from './challenge-factory.service';
import { Challenge } from '../models/challenge';

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

  // Session state management
  startSession(): void {
    const state: SessionState = {
      challenges: this.factory.build(),
      currentIndex: 0,
      completed: false,
    };
    this.save(state);
  }

  completeSession(): void {
    const state = this._session();
    if (!state) return;
    this.save({ ...state, completed: true });
  }

  resetSession(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this._session.set(null);
  }

  // challenge pagination
  goToIndex(index: number): void {
    const state = this._session();
    if (!state) return;
    if (index < 0 || index >= state.challenges.length) return;
    this.save({ ...state, currentIndex: index });
  }

  advanceIndex(): void {
    const state = this._session();
    if (!state) return;
    const next = state.currentIndex + 1;
    if (next >= state.challenges.length) {
      this.completeSession();
    } else {
      this.save({ ...state, currentIndex: next });
    }
  }

  // Session storage management
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

  // Answers evaluation
  submitAnswer(answer: string | number | number[]): boolean {
    const state = this._session();
    if (!state) return false;

    const index = state.currentIndex;
    const challenge = state.challenges[index];
    const isCorrect = this.evaluate(challenge, answer);

    if (isCorrect) {
      this.updateSession(answer);
    } else {
      this.refreshCurrent();
    }

    return isCorrect;
  }

  updateSession(answer: string | number | number[]) {
    const state = this._session();
    if (!state) return;

    const index = state.currentIndex;
    const updated: SessionState = {
      ...state,
      challenges: state.challenges.map((c, i) => (i === index ? { ...c, userAnswer: answer } : c)),
    };
    this.save(updated);
  }

  private evaluate(challenge: Challenge, answer: string | number | number[]): boolean {
    switch (challenge.type) {
      case 'image-select': {
        const selected = answer as number[];
        const targets = challenge.imageOptions!.filter((o) => o.isTarget).map((o) => o.id);
        return targets.length === selected.length && targets.every((id) => selected.includes(id));
      }
      case 'math': {
        const raw = challenge.question;
        let correct: number;
        if (raw.includes('+')) {
          const [a, b] = raw.replace(' = ?', '').split(' + ').map(Number);
          correct = a + b;
        } else if (raw.includes('−')) {
          const [a, b] = raw.replace(' = ?', '').split(' − ').map(Number);
          correct = a - b;
        } else {
          const [a, b] = raw.replace(' = ?', '').split(' × ').map(Number);
          correct = a * b;
        }
        return (answer as number) === correct;
      }
      case 'text-input': {
        return (answer as string).trim().toUpperCase() === challenge.textTarget!.toUpperCase();
      }
    }
  }

  private refreshCurrent(): void {
    const state = this._session();
    if (!state) return;

    const index = state.currentIndex;
    const current = state.challenges[index];

    let refreshed: Challenge;

    switch (current.type) {
      case 'image-select':
        refreshed = this.factory.imageChallengeBuilder(index);
        break;

      case 'math':
        refreshed = this.factory.mathChallengeBuilder(index);
        break;

      case 'text-input':
        refreshed = this.factory.textChallengeBuilder(index);
        break;
    }

    const updated: SessionState = {
      ...state,
      challenges: state.challenges.map((challenge, i) => (i === index ? refreshed : challenge)),
    };

    this.save(updated);
  }
}
