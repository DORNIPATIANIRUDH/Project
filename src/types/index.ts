export interface Question {
  id: number;
  text: string;
  category: 'delivery' | 'adaptation' | 'collaboration' | 'technical' | 'optimization' | 'team';
  description: string;
}

export interface Answer {
  questionId: number;
  score: number; // 1-5
}

export interface Assessment {
  id: string;
  date: string;
  teamName: string;
  answers: Answer[];
  complete: boolean;
}

export interface CategoryScore {
  category: string;
  score: number;
  maxScore: number;
}