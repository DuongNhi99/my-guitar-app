import { useState } from "react";

const questions = [
  {
    question: "Which string is the thickest on a guitar?",
    options: ["1st", "3rd", "6th", "5th"],
    answer: "6th",
  },
  {
    question: "What is the English word for 'chien' in French?",
    options: ["Cat", "Bird", "Dog", "Horse"],
    answer: "Dog",
  },
];

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (option: string) => {
    if (option === questions[current].answer) setScore(score + 1);
    const next = current + 1;
    if (next < questions.length) setCurrent(next);
    else setFinished(true);
  };

  return (
    <div className="p-6">
      {finished ? (
        <div className="text-xl">🎉 Quiz complete! Your score: {score}/{questions.length}</div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">{questions[current].question}</h2>
          <div className="space-y-2">
            {questions[current].options.map((opt) => (
              <button
                key={opt}
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                onClick={() => handleAnswer(opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
