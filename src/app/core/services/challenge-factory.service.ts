import { Injectable } from '@angular/core';
import { Challenge, ImageOption } from '../models/challenge';

interface ImagePool {
  name: string;
  question: string;
  correctSrcs: string[];
  otherSrcs: string[];
}

const IMAGE_POOLS: ImagePool[] = [
  {
    name: 'cats',
    question: 'Select all images that contain a <strong>cat</strong>.',
    correctSrcs: [
      'assets/images/cats/cat1.png',
      'assets/images/cats/cat2.png',
      'assets/images/cats/cat3.png',
      'assets/images/cats/cat4.png',
    ],
    otherSrcs: [
      'assets/images/dogs/dog1.png',
      'assets/images/dogs/dog2.png',
      'assets/images/dogs/dog3.png',
      'assets/images/dogs/dog4.png',
      'assets/images/bunnies/bunny1.png',
      'assets/images/bunnies/bunny2.png',
      'assets/images/bunnies/bunny3.png',
      'assets/images/bunnies/bunny4.png',
    ],
  },
  {
    name: 'dogs',
    question: 'Select all images that contain a <strong>dog</strong>.',
    correctSrcs: [
      'assets/images/dogs/dog1.png',
      'assets/images/dogs/dog2.png',
      'assets/images/dogs/dog3.png',
      'assets/images/dogs/dog4.png',
    ],
    otherSrcs: [
      'assets/images/cats/cat1.png',
      'assets/images/cats/cat2.png',
      'assets/images/cats/cat3.png',
      'assets/images/cats/cat4.png',
      'assets/images/bunnies/bunny1.png',
      'assets/images/bunnies/bunny2.png',
      'assets/images/bunnies/bunny3.png',
      'assets/images/bunnies/bunny4.png',
    ],
  },
  {
    name: 'bunnies',
    question: 'Select all images that contain a <strong>bunny</strong>.',
    correctSrcs: [
      'assets/images/bunnies/bunny1.png',
      'assets/images/bunnies/bunny2.png',
      'assets/images/bunnies/bunny3.png',
      'assets/images/bunnies/bunny4.png',
    ],
    otherSrcs: [
      'assets/images/dogs/dog1.png',
      'assets/images/dogs/dog2.png',
      'assets/images/dogs/dog3.png',
      'assets/images/dogs/dog4.png',
      'assets/images/cats/cat1.png',
      'assets/images/cats/cat2.png',
      'assets/images/cats/cat3.png',
      'assets/images/cats/cat4.png',
    ],
  },
];

const TEXT_CHALLENGES = [
  { target: 'ANGULAR' },
  { target: 'CAPTCHA' },
  { target: 'SECURE42' },
  { target: 'VERIFY7X' },
];

@Injectable({ providedIn: 'root' })
export class ChallengeFactoryService {
  private imageChallengeBuilder(id: number): Challenge {
    const pool = this.pickRandom(IMAGE_POOLS);

    const correctCount = this.rand(2, 4);
    const correct = this.shuffle(pool.correctSrcs).slice(0, correctCount);

    const wrong = this.shuffle(pool.otherSrcs).slice(0, 9 - correctCount);

    const all = this.shuffle([...correct, ...wrong]);

    const imageOptions: ImageOption[] = all.map((src, i) => ({
      id: i,
      label: `image ${i}`,
      src,
      isTarget: correct.includes(src),
    }));

    return {
      id,
      type: 'image-select',
      question: pool.question,
      imageOptions,
    };
  }

  private mathChallengeBuilder(id: number): Challenge {
    const ops = ['+', '-', '*'];
    const op = this.pickRandom(ops);

    let a = this.rand(2, 12);
    let b = this.rand(2, 12);
    let correct: number;
    let question: string;

    switch (op) {
      case '+':
        correct = a + b;
        question = `${a} + ${b} = ?`;
        break;
      case '-':
        if (a < b) [a, b] = [b, a];
        correct = a - b;
        question = `${a} − ${b} = ?`;
        break;
      default:
        a = this.rand(2, 9);
        b = this.rand(2, 9);
        correct = a * b;
        question = `${a} × ${b} = ?`;
    }

    const wrong = new Set<number>();
    while (wrong.size < 3) {
      const v = correct + this.rand(-5, 5);
      if (v !== correct && v >= 0) wrong.add(v);
    }

    const mathOptions = this.shuffle([correct, ...Array.from(wrong)]);

    return {
      id,
      type: 'math',
      question,
      mathOptions,
    };
  }

  private textChallengeBuilder(id: number): Challenge {
    const text = this.pickRandom(TEXT_CHALLENGES);

    return {
      id: id++,
      type: 'text-input',
      question: 'Type the characters you see below exactly as shown:',
      textTarget: text.target,
    };
  }

  // Helpers
  private pickRandom<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  private rand(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private shuffle<T>(arr: T[]): T[] {
    return [...arr].sort(() => Math.random() - 0.5);
  }
}
