import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import toast from "react-hot-toast";

interface EditCourseModalProps {
  course: any;
  onClose: () => void;
  onUpdate: () => void;
}

export default function EditCourseModal({ course, onClose, onUpdate }: EditCourseModalProps) {
  const [edited, setEdited] = useState({ ...course });

  const handleSave = async () => {
    try {
      const ref = doc(db, "courses", course.id);
      await updateDoc(ref, {
        title: edited.title,
        description: edited.description,
        topic: edited.topic,
        videoId: edited.videoId,
      });
      toast.success("Course updated!");
      onUpdate();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update course.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-[#2a2a40] p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">✏️ Edit Course</h2>
        <input
          className="w-full mb-2 p-2 rounded bg-gray-100 dark:bg-[#4a4e69]"
          value={edited.title}
          onChange={(e) => setEdited({ ...edited, title: e.target.value })}
          placeholder="Title"
        />
        <textarea
          className="w-full mb-2 p-2 rounded bg-gray-100 dark:bg-[#4a4e69]"
          value={edited.description}
          onChange={(e) => setEdited({ ...edited, description: e.target.value })}
          placeholder="Description"
        />
        <select
          value={edited.topic}
          onChange={(e) => setEdited({ ...edited, topic: e.target.value })}
          className="w-full p-2 mb-2 rounded bg-gray-100 dark:bg-[#4a4e69]"
        >
          <option value="guitar">Guitar</option>
          <option value="english">English</option>
        </select>
        <input
          className="w-full mb-4 p-2 rounded bg-gray-100 dark:bg-[#4a4e69]"
          value={edited.videoId}
          onChange={(e) => setEdited({ ...edited, videoId: e.target.value })}
          placeholder="YouTube Video ID"
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600">
            Cancel
          </button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
