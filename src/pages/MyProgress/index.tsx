

// import { useEffect, useState } from "react";
// import { getFirestore, collection, getDocs } from "firebase/firestore";
// import { getAuth } from "firebase/auth";

// type ScoreItem = {
//   courseId: string;
//   courseTitle: string;
//   score: number;
// };

// export default function MyProgress() {
//   const [scores, setScores] = useState<ScoreItem[]>([]);
//   const db = getFirestore();
//   const auth = getAuth();

//   useEffect(() => {
//     const fetchScores = async () => {
//       const user = auth.currentUser;
//       if (!user) return;

//       const snapshot = await getDocs(
//         collection(db, "users", user.uid, "scores")
//       );
//       const data = snapshot.docs.map((doc) => doc.data() as ScoreItem);
//       setScores(data);
//     };

//     fetchScores();
//   }, []);

//   return (
//     <div className="max-w-xl mx-auto px-4 py-6">
//       <h2 className="text-2xl font-semibold mb-4">📈 My Progress</h2>
//       {scores.length === 0 ? (
//         <p>No scores yet. Take some quizzes!</p>
//       ) : (
//         <ul className="space-y-3">
//           {scores.map((s, i) => (
//             <li
//               key={i}
//               className="p-3 border rounded-md flex justify-between dark:bg-gray-800"
//             >
//               <span>{s.courseTitle}</span>
//               <span>✅ {s.score}</span>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../lib/firebase";

interface Result {
  courseTitle: string;
  score: number;
  timestamp: number;
}

export default function MyProgress() {
  const [user] = useAuthState(auth);
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    if (user) {
      // From Firebase
      const q = query(
        collection(db, "results"),
        where("userId", "==", user.uid)
      );
      getDocs(q).then((snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data() as Result);
        setResults(data);
      });
    } else {
      // From localStorage
      const localData = Object.entries(localStorage)
        .filter(([key]) => key.startsWith("quiz_result_"))
        .map(([, value]) => JSON.parse(value));
      setResults(localData);
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-[#f4f1ee] dark:bg-[#22223b] text-[#4a4e69] dark:text-[#f2e9e4] px-4 py-10">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">📊 My Progress</h1>
        {results.length === 0 ? (
          <p>No progress yet.</p>
        ) : (
          <ul className="space-y-4">
            {results.map((r, idx) => (
              <li
                key={idx}
                className="bg-white dark:bg-[#4a4e69] rounded-md p-4 shadow"
              >
                <p className="font-semibold">{r.courseTitle}</p>
                <p className="text-sm">
                  Score: {r.score} |{" "}
                  {new Date(r.timestamp).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
