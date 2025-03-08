export type Habit = {
  id: string;
  name: string;
  emoji: string;
  currentStreak?: number;
  bestStreak?: number;
  date?: string;
  days: string[];
};
