export interface Balloon {
  id: number;
  x: number; // percentage from left
  type: 'good' | 'bad';
  color: string;
  speed: number; // animation duration in seconds
  size: number; // size in pixels
}

export enum GameStatus {
  NotStarted,
  Playing,
  GameOver,
}