
// pages/admin/AdminPage.tsx
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../lib/firebase";
import AdminCourseList from "./AdminCourseList";
import toast, { Toaster } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import CourseFormModal from "./CourseFormModal"; // ✅ import modal

export default function AdminPage() {
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);

  const uploadFile = async (file: File, path: string) => {
    const storageRef = ref(storage, `${path}/${uuidv4()}-${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleAddCourse = async (
    course: any,
    thumbnailFile: File | null,
    pdfFile: File | null
  ) => {
    try {
      const loadingToast = toast.loading("Uploading...");

      let thumbnailURL = "";
      let pdfURL = "";

      if (thumbnailFile) {
        thumbnailURL = await uploadFile(thumbnailFile, "thumbnails");
      }

      if (pdfFile) {
        pdfURL = await uploadFile(pdfFile, "pdfs");
      }

      const courseData = {
        ...course,
        thumbnailURL,
        pdfURL,
        createdAt: new Date(),
      };

      await addDoc(collection(db, "courses"), courseData);
      toast.success("Course added!", { id: loadingToast });
    } catch (err) {
      console.error("Error adding course:", err);
      toast.error("Failed to add course.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f1ee] dark:bg-[#22223b] text-[#4a4e69] dark:text-[#f2e9e4] px-4 py-8">
      <Toaster />
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">🛠 Admin Panel</h1>
          <button
            onClick={() => setIsCourseModalOpen(true)}
            className="bg-[#c9ada7] hover:bg-[#b18f88] text-white px-4 py-2 rounded"
          >
            ➕ Add New Course
          </button>
        </div>

        <AdminCourseList />
      </div>

      <CourseFormModal
        isOpen={isCourseModalOpen}
        onClose={() => setIsCourseModalOpen(false)}
        onSubmit={handleAddCourse}
      />
    </div>
  );
}
