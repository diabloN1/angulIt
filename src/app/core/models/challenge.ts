export type ChallengeType = 'image-select' | 'math' | 'text-input';

export interface ImageOption {
  id: number;
  src: string;
  label: string;
  isTarget: boolean;
}

export interface Challenge {
  id: number;
  type: ChallengeType;
  question: string;
  // image-select
  imageOptions?: ImageOption[];
  // math
  mathOptions?: number[];
  // text-input
  textTarget?: string;
  userAnswer?: string | number | number[];
}
