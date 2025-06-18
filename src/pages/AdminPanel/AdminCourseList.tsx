
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";
import toast from "react-hot-toast";
import EditCourseModal from "./EditCourseModal";

export default function AdminCourseList() {
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchCourses = async () => {
    const snap = await getDocs(collection(db, "courses"));
    const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setCourses(data);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "courses", id));
      toast.success("Course deleted.");
      fetchCourses();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete course.");
    }
  };

  const openEditModal = (course: any) => {
    setSelectedCourse(course);
    setIsEditModalOpen(true);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">📚 Course List</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white dark:bg-[#4a4e69] p-4 rounded shadow space-y-2">
            <h3 className="text-lg font-bold">{course.title}</h3>
            <p className="text-sm">{course.description}</p>
            <p className="text-sm text-gray-500">Topic: {course.topic}</p>

            {course.thumbnailURL && (
              <img src={course.thumbnailURL} alt="thumb" className="h-32 rounded object-cover" />
            )}

            {course.videoId && (
              <iframe
                src={`https://www.youtube.com/embed/${course.videoId}`}
                className="w-full aspect-video rounded"
                title="Video"
                allowFullScreen
              />
            )}

            <div className="flex gap-4 text-sm mt-2">
              <button
                onClick={() => openEditModal(course)}
                className="text-blue-600 hover:underline"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => handleDelete(course.id)}
                className="text-red-600 hover:underline"
              >
                🗑 Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isEditModalOpen && selectedCourse && (
        <EditCourseModal
          course={selectedCourse}
          onClose={() => setIsEditModalOpen(false)}
          onUpdate={fetchCourses}
        />
      )}
    </div>
  );
}
