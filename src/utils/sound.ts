import { Howl } from 'howler';
import bounce from '../assets/bounce.mp3'
import goal from '../assets/goal.mp3'


const goalSound = new Howl({
  src: goal,
  volume: 0.5
});

const bounceSound = new Howl({
  src: bounce,
  volume: 0.3
});

export const playGoalSound = () => goalSound.play();
export const playBounceSound = () => bounceSound.play();