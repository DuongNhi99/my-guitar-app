


import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f4f1ee] dark:bg-[#22223b] text-[#4a4e69] dark:text-[#f2e9e4] flex items-center justify-center px-4">
      <div className="max-w-xl w-full text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold">🎓 Learn Guitar & English</h1>
        <p className="text-lg">Start your journey now with curated videos and interactive quizzes!</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/guitar"
            className="bg-[#c9ada7] hover:bg-[#9a8c98] text-white px-6 py-3 rounded-md transition"
          >
            🎸 Guitar Courses
          </Link>
          <Link
            to="/english"
            className="bg-[#c9ada7] hover:bg-[#9a8c98] text-white px-6 py-3 rounded-md transition"
          >
            📚 English Courses
          </Link>
        </div>
      </div>
    </main>
  );
}
