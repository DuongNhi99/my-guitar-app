import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Link } from "react-router-dom";

// import { fetchCoursesByTopic } from "../utils/firestoreUtils";
export default function Guitar() {
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const q = query(collection(db, "courses"), where("type", "==", "guitar"));
      const snap = await getDocs(q);
      setCourses(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetch();
  }, []);
	//   useEffect(() => {
  //   fetchCoursesByTopic("guitar").then(setCourses);
  // }, []);

  return (

    // <div className="max-w-6xl mx-auto px-4 py-6">
    //   <h2 className="text-2xl font-semibold mb-4">Courses</h2>
    //   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    //     {courses.map((course) => (
    //       <div
    //         className="border p-4 rounded-lg dark:bg-gray-800"
    //         key={course.id}
    //       >
    //         <h3 className="text-xl font-bold mb-2">{course.title}</h3>
    //         <p className="text-sm mb-2">{course.description}</p>
    //         <Link
    //           to={`/course/${course.id}`}
    //           className="text-blue-500 underline"
    //         >
    //           View Course
    //         </Link>
    //       </div>
    //     ))}
    //   </div>
    // </div>
		  <div className="min-h-screen bg-[#f4f1ee] dark:bg-[#22223b] text-[#4a4e69] dark:text-[#f2e9e4] px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">🎸 Guitar Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white dark:bg-[#4a4e69] p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <p className="text-sm mb-3">{course.description}</p>
              <Link
                to={`/course/${course.id}`}
                className="text-[#c9ada7] hover:underline"
              >
                View Course →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
