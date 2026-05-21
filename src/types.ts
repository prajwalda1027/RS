export interface GymClass {
  id: string;
  name: string;
  category: 'gym' | 'zumba' | 'yoga' | 'crossfit' | 'strength' | 'cardio';
  trainer: string;
  duration: string;
  spots: number;
  timeSlot: string;
  intensity: 'Beginner' | 'Medium' | 'High' | 'Elite';
  description: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  source: 'Google Reviews';
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  author: string;
  authorTitle: string;
}

export interface AssessmentResult {
  bmi: number;
  bmiCategory: string;
  dailyCalories: number;
  recommendedWater: number;
  workoutPlan: string[];
  dietAdvice: string[];
}
