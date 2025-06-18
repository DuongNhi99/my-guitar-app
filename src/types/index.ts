export interface Course {
  id?: string; // Firestore document ID
  title: string;
  description: string;
  topic: "guitar" | "english" | string;
  videoId: string;
  thumbnailURL?: string;
  pdfURL?: string;
  createdAt?: any;
}

// export interface Quiz {
//   id?: string; // Firestore document ID
//   courseId: string; // Related course
//   question: string;
//   options: [string, string, string, string]; // Fixed 4 options
//   correctAnswer: number; // Index of correct answer (0-3)
//   createdAt?: any;
// }
export interface QuizQuestion {
  question: string;
  options: string[];
  answer: number; // index of correct option
}
