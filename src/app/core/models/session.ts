import { Challenge } from './challenge';

export interface SessionState {
  challenges: Challenge[];
  currentIndex: number;
  completed: boolean;
}
