// src/pages/CourseDetail.tsx
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<any>(null);

  useEffect(() => {
    const fetch = async () => {
      const ref = doc(db, "courses", id!);
      const snap = await getDoc(ref);
      if (snap.exists()) setCourse({ id: snap.id, ...snap.data() });
    };
    fetch();
  }, [id]);

  if (!course) return <div className="p-6">Loading...</div>;

  const videoId = course.videoUrl?.split("v=")[1]?.split("&")[0] ?? "";

  return (
    // <div className="p-6 max-w-4xl mx-auto">
    //   <h1 className="text-2xl font-bold mb-4">{course.title}</h1>
    //   <p className="mb-4">{course.description}</p>

    //   {videoId && (
    //     <div className="aspect-video mb-6">
    //       <iframe
    //         className="w-full h-full"
    //         src={`https://www.youtube.com/embed/${videoId}`}
    //         title="YouTube Video"
    //         allowFullScreen
    //       />
    //     </div>
    //   )}

    //   <button
    //     className="btn"
    //     onClick={() => navigate(`/quiz/${course.id}`)}
    //   >
    //     Start Quiz
    //   </button>
    // </div>
		<div className="max-w-4xl mx-auto px-4 py-6">
  <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
  <div className="aspect-video mb-6">
    <iframe className="w-full h-full rounded-md" src={course.videoUrl} allowFullScreen />
  </div>
  <Link to={`/quiz/${id}`} className="inline-block bg-blue-500 text-white py-2 px-4 rounded-md">Take Quiz</Link>
</div>

  );
}
