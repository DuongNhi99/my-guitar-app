
import { useState, useEffect } from "react";
import Modal from "../../components/common/Modal";
import { Course, QuizQuestion } from "../../types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    course: Course,
    thumbnailFile: File | null,
    pdfFile: File | null,
    quiz?: QuizQuestion[]
  ) => void;
  initialCourse?: Course;
  isEdit?: boolean;
}

export default function CourseFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialCourse,
  isEdit = false,
}: Props) {
  const [activeTab, setActiveTab] = useState<"course" | "quiz">("course");

  const [course, setCourse] = useState<Course>({
    title: "",
    description: "",
    topic: "",
    videoId: "",
  });
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);

  useEffect(() => {
    if (initialCourse) {
      setCourse(initialCourse);
    }
  }, [initialCourse]);

  const handleSubmit = () => {
    if (!course.title || !course.description || !course.topic) {
      alert("Please fill all required fields.");
      return;
    }
    onSubmit(course, thumbnailFile, pdfFile, quiz);
    onClose();
    setCourse({ title: "", description: "", topic: "", videoId: "" });
    setThumbnailFile(null);
    setPdfFile(null);
    setQuiz([]);
  };

  const addQuizQuestion = () => {
    setQuiz([
      ...quiz,
      { question: "", options: ["", "", "", ""], answer: 0 },
    ]);
  };

  const updateQuizQuestion = (index: number, updated: QuizQuestion) => {
    const newQuiz = [...quiz];
    newQuiz[index] = updated;
    setQuiz(newQuiz);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4">
        {/* Tabs */}
        <div className="flex gap-4 border-b pb-2">
          <button
            className={`px-4 py-2 rounded-t ${activeTab === "course" ? "bg-[#c9ada7] text-white" : "bg-gray-200 dark:bg-gray-700"}`}
            onClick={() => setActiveTab("course")}
          >
            {isEdit ? "Edit Course" : "Add Course"}
          </button>
          <button
            className={`px-4 py-2 rounded-t ${activeTab === "quiz" ? "bg-[#c9ada7] text-white" : "bg-gray-200 dark:bg-gray-700"}`}
            onClick={() => setActiveTab("quiz")}
          >
            Add Quiz
          </button>
        </div>

        {/* Course Form */}
        {activeTab === "course" && (
          <>
            <input
              placeholder="Course Title"
              value={course.title}
              onChange={(e) => setCourse({ ...course, title: e.target.value })}
              className="w-full input-style"
            />
            <textarea
              placeholder="Description"
              value={course.description}
              onChange={(e) => setCourse({ ...course, description: e.target.value })}
              className="w-full input-style"
            />
            <select
              value={course.topic}
              onChange={(e) => setCourse({ ...course, topic: e.target.value })}
              className="w-full input-style"
            >
              <option value="">Select Topic</option>
              <option value="guitar">Guitar</option>
              <option value="english">English</option>
            </select>
            <input
              placeholder="YouTube Video ID"
              value={course.videoId}
              onChange={(e) => setCourse({ ...course, videoId: e.target.value })}
              className="w-full input-style"
            />
            {course.videoId && (
              <iframe
                className="w-full aspect-video mt-2 rounded"
                src={`https://www.youtube.com/embed/${course.videoId}`}
                title="Video Preview"
                allowFullScreen
              />
            )}
            <div className="flex flex-wrap gap-4">
              <div>
                <label className="block text-sm font-medium">Thumbnail</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
                  className="w-full input-style"
                />
                {thumbnailFile && (
                  <img
                    src={URL.createObjectURL(thumbnailFile)}
                    alt="Thumbnail Preview"
                    className="mt-2 h-24 rounded"
                  />
                )}
              </div>
              <div>
                <label className="block text-sm font-medium">PDF Attachment</label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                  className="w-full input-style"
                />
                {pdfFile && <p className="mt-2 text-sm">{pdfFile.name}</p>}
              </div>
            </div>
          </>
        )}

        {/* Quiz Form */}
        {activeTab === "quiz" && (
          <div className="space-y-4">
            {quiz.map((q, index) => (
              <div key={index} className="p-2 border rounded space-y-2 bg-white dark:bg-[#4a4e69]">
                <input
                  placeholder={`Question ${index + 1}`}
                  value={q.question}
                  onChange={(e) =>
                    updateQuizQuestion(index, { ...q, question: e.target.value })
                  }
                  className="w-full input-style"
                />
                {q.options.map((opt, optIdx) => (
                  <input
                    key={optIdx}
                    placeholder={`Option ${optIdx + 1}`}
                    value={opt}
                    onChange={(e) => {
                      const updatedOptions = [...q.options];
                      updatedOptions[optIdx] = e.target.value;
                      updateQuizQuestion(index, {
                        ...q,
                        options: updatedOptions,
                      });
                    }}
                    className="w-full input-style"
                  />
                ))}
                <select
                  value={q.answer}
                  onChange={(e) =>
                    updateQuizQuestion(index, {
                      ...q,
                      answer: parseInt(e.target.value),
                    })
                  }
                  className="w-full input-style"
                >
                  <option value="">Select Correct Answer</option>
                  {q.options.map((_, idx) => (
                    <option key={idx} value={idx}>
                      Option {idx + 1}
                    </option>
                  ))}
                </select>
              </div>
            ))}
            <button onClick={addQuizQuestion} className="btn-add">
              + Add Question
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 pt-4">
          <button
            className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button onClick={handleSubmit} className="btn-submit">
            {isEdit ? "Update Course" : "Add Course"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
