interface ImagePool {
  name: string;
  question: string;
  correctSrcs: string[];
  otherSrcs: string[];
}

const IMAGE_POOLS:  ImagePool[] = [
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
  }
];
