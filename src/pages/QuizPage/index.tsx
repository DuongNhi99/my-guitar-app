// src/pages/QuizPage.tsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function QuizPage() {
  const { id } = useParams();
  const [questions, setQuestions] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      const q = query(collection(db, "quizzes"), where("courseId", "==", id));
      const snap = await getDocs(q);
      if (!snap.empty) {
        const quizData = snap.docs[0].data();
        setQuestions(quizData.questions);
      }
    };
    fetchQuiz();
  }, [id]);

  const handleAnswer = () => {
    if (!selected) return;
    if (selected === questions[current].answer) setScore((s) => s + 1);
    setSelected(null);

    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1);
    } else {
      setFinished(true);
    }
  };

  if (!questions.length) return <div className="p-6">Loading quiz...</div>;

  if (finished) {
    return (
      <div className="p-6 max-w-md mx-auto">
        <h2 className="text-2xl font-bold">✅ Quiz Complete!</h2>
        <p className="mt-4">
          Your score: {score} / {questions.length}
        </p>
      </div>
    );
  }

  const q = questions[current];

  useEffect(() => {
    if (finished) {
      const prevScores = JSON.parse(localStorage.getItem("quizScores") || "[]");
      localStorage.setItem(
        "quizScores",
        JSON.stringify([...prevScores, { courseId: id, score }])
      );
    }
  }, [finished]);

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h2 className="text-xl font-bold">Question {current + 1}</h2>
      <p>{q.question}</p>
      <div className="space-y-2">
        {q.options.map((opt: string, idx: number) => (
          <div key={idx}>
            <label className="flex gap-2 items-center">
              <input
                type="radio"
                name="answer"
                value={opt}
                checked={selected === opt}
                onChange={() => setSelected(opt)}
              />
              {opt}
            </label>
          </div>
        ))}
      </div>
      <button className="btn" onClick={handleAnswer} disabled={!selected}>
        {current + 1 === questions.length ? "Finish" : "Next"}
      </button>
    </div>

    // <div className="max-w-3xl mx-auto px-4 py-6">
    //   <h2 className="text-2xl font-semibold mb-4">{course?.title} Quiz</h2>
    //   <div className="space-y-4">
    //     <p className="text-lg font-medium">{q.question}</p>
    //     {q.options.map((opt, idx) => (
    //       <label key={idx} className="block border p-3 rounded-md dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
    //         <input type="radio" className="mr-2" name="answer" value={opt} onChange={() => setSelected(opt)} />
    //         {opt}
    //       </label>
    //     ))}
    //   </div>
    //   <div className="mt-6 flex flex-col sm:flex-row gap-4">
    //     <button onClick={handleSubmit} className="bg-green-500 text-white py-2 px-4 rounded-md w-full sm:w-auto">Submit</button>
    //     {finished && <p className="text-xl font-bold">✅ Final Score: {score}</p>}
    //   </div>
    // </div>
  );
}
