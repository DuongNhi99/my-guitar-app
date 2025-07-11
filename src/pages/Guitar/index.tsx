import { useEffect, useState } from "react";
import { db, auth } from "../../lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import TreeMenu from "../../components/common/TreeMenu";
import { useAuthState } from "react-firebase-hooks/auth";
import sectionsData from "./mockData";

// Define the type for lesson parts

function getLessonKey(sectionIdx: number, dayIdx: number) {
  return `guitar-lesson-finished-${sectionIdx}-${dayIdx}`;
}

function getLessonFinished(key: string) {
  // Check sessionStorage first, then localStorage
  if (sessionStorage.getItem(key) === "1") return true;
  if (localStorage.getItem(key) === "1") return true;
  return false;
}

export default function Guitar() {
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<{
    sectionIdx: number;
    dayIdx: number;
  } | null>(null);

  const [user] = useAuthState(auth);
  // Track finished lessons
  const [finished, setFinished] = useState<{ [key: string]: boolean }>({});
  const [previewImg, setPreviewImg] = useState<string | null>(null);

  // Load finished lessons from Firestore for this user
  useEffect(() => {
    if (!user) return;
    const fetchFinished = async () => {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const data = userDoc.exists() ? userDoc.data() : {};
      setFinished(data.finishedLessons || {});
    };
    fetchFinished();
  }, [user]);

  // Mark lesson as finished in Firestore for this user
  const handleFinishLesson = async (sectionIdx: number, dayIdx: number) => {
    if (!user) return;
    const key = getLessonKey(sectionIdx, dayIdx);
    const updated = { ...finished, [key]: true };
    setFinished(updated);
    await setDoc(
      doc(db, "users", user.uid),
      { finishedLessons: updated },
      { merge: true }
    );
  };

  useEffect(() => {
    const all: { [key: string]: boolean } = {};
    for (let s = 0; s < sectionsData.length; s++) {
      for (let d = 0; d < sectionsData[s].lessons.length; d++) {
        const key = getLessonKey(s, d);
        if (getLessonFinished(key)) {
          all[key] = true;
        }
      }
    }
    setFinished(all);
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const q = query(collection(db, "courses"), where("type", "==", "guitar"));
      const snap = await getDocs(q);
      setCourses(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetch();
  }, []);

  //   const handleFinishLesson = (sectionIdx: number, dayIdx: number) => {
  //   const key = getLessonKey(sectionIdx, dayIdx);
  //   localStorage.setItem(key, "1");
  //   sessionStorage.setItem(key, "1");
  //   setFinished((prev) => ({ ...prev, [key]: true }));
  // };

  //   const isLessonUnlocked = (sectionIdx: number, dayIdx: number) => {
  //   if (dayIdx === 0) return true;
  //   const prevKey = getLessonKey(sectionIdx, dayIdx - 1);
  //   return !!finished[prevKey];
  // };

  const isLessonUnlocked = (sectionIdx: number, dayIdx: number) => {
    if (sectionIdx === 0) {
      // Section 1: unlock Day 1, or previous day must be finished
      if (dayIdx === 0) return true;
      const prevKey = getLessonKey(sectionIdx, dayIdx - 1);
      return !!finished[prevKey];
    } else {
      // Section 2 or 3: unlock Day 1 only if previous section's last day is finished
      if (dayIdx === 0) {
        const prevSectionKey = getLessonKey(
          sectionIdx - 1,
          sectionsData[sectionIdx - 1].lessons.length - 1
        );
        return !!finished[prevSectionKey];
      }
      // Otherwise, unlock if previous day in this section is finished
      const prevKey = getLessonKey(sectionIdx, dayIdx - 1);
      return !!finished[prevKey];
    }
  };
  return (
    <div className=" bg-[#f4f1ee] dark:bg-[#22223b] text-[#4a4e69] dark:text-[#f2e9e4] px-2 sm:px-4 py-4 sm:py-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4 md:gap-8">
        {/* Left: Title and Tree Menu */}
        <div className="w-full md:w-72 flex flex-col items-center md:items-start mb-6 md:mb-0">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 flex items-center gap-2 text-[#22223b] dark:text-[#4a4e69]">
            <span role="img" aria-label="guitar">
              🎸
            </span>{" "}
            Guitar Courses
          </h2>
          <div className="w-full">
            <TreeMenu
              sections={sectionsData}
              onSelect={(sectionIdx, dayIdx) =>
                setSelectedLesson({ sectionIdx, dayIdx })
              }
              isLessonUnlocked={isLessonUnlocked}
              finished={finished}
            />
          </div>
        </div>
        {/* Right: Content */}
        <div className="flex-1 w-full">
          {selectedLesson ? (
            <div className="bg-white dark:bg-[#4a4e69] p-3 sm:p-6 rounded-lg shadow mb-6">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4">
                {sectionsData[selectedLesson.sectionIdx].name} -{" "}
                {
                  sectionsData[selectedLesson.sectionIdx].lessons[
                    selectedLesson.dayIdx
                  ].title
                }
              </h3>
              <div className="space-y-4">
                {/* {sectionsData[selectedLesson.sectionIdx].lessons[
                  selectedLesson.dayIdx
                ].parts.map((part, idx) => (
                  <div
                    key={idx}
                    className="border-l-4 border-[#c9ada7] pl-4 mb-4"
                  >
                    <h4 className="text-lg font-bold mb-1">{part.heading}</h4>
                    <p className="text-base mb-2">{part.content}</p>
                    {part.image && (
                      <div className="flex flex-col items-center gap-4 my-2">
                        {part.image.map((img, i) => (
                          <img
                            key={i}
                            src={img}
                            alt={part.heading + " " + (i + 1)}
                            className="mb-2 rounded shadow max-w-[90vw] sm:max-w-xs cursor-pointer hover:scale-105 transition-transform border-2 border-[#c9ada7]"
                            onClick={() => setPreviewImg(img)}
                          />
                        ))}
                      </div>
                    )}
                    {part.more && (
                      <div className="text-sm text-[#22223b] dark:text-[#f2e9e4] italic">
                        {part.more}
                      </div>
                    )}
                  </div>
                ))} */}
                {sectionsData[selectedLesson.sectionIdx].lessons[
                  selectedLesson.dayIdx
                ].parts.map((part, idx) => (
                  <div
                    key={idx}
                    className="border-l-4 border-[#c9ada7] pl-4 mb-4"
                  >
                    <h4 className="text-lg font-bold mb-1">{part.heading}</h4>
                    <p className="text-base mb-2">{part.content}</p>
                    {part.image && (
                      <div className="flex flex-col items-center gap-4 my-2">
                        {part.image.map((img, i) => (
                          <img
                            key={i}
                            src={img}
                            alt={part.heading + " " + (i + 1)}
                            // Make Song Practice images larger
                            className={`mb-2 rounded shadow cursor-pointer hover:scale-105 transition-transform border-2 border-[#c9ada7] ${
                              part.heading
                                .toLowerCase()
                                .includes("song practice")
                                ? "max-w-[98vw] sm:max-w-2xl"
                                : "max-w-[90vw] sm:max-w-xs"
                            }`}
                            onClick={() => setPreviewImg(img)}
                          />
                        ))}
                      </div>
                    )}
                    {part.more && (
                      <div className="text-sm text-[#22223b] dark:text-[#f2e9e4] italic">
                        {part.more}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {/* Mark as finished button */}
              {!finished[
                getLessonKey(selectedLesson.sectionIdx, selectedLesson.dayIdx)
              ] && (
                <button
                  className="mt-4 px-4 py-2 bg-[#c9ada7] text-white rounded hover:bg-[#b5838d] transition disabled:opacity-50 w-full sm:w-auto"
                  onClick={() =>
                    handleFinishLesson(
                      selectedLesson.sectionIdx,
                      selectedLesson.dayIdx
                    )
                  }
                  disabled={!user}
                >
                  {user ? "Mark as Finished" : "Login to Mark as Finished"}
                </button>
              )}
              {finished[
                getLessonKey(selectedLesson.sectionIdx, selectedLesson.dayIdx)
              ] && (
                <div className="mt-4 text-green-600 font-semibold">
                  Lesson Finished!
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
          )}

          {/* Responsive Image Preview Modal */}
          {previewImg && (
            <div
              className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 overflow-y-auto"
              onClick={() => setPreviewImg(null)}
              style={{ overscrollBehavior: "contain" }}
            >
              <div className="relative my-8 pointer-events-auto">
                <img
                  src={previewImg}
                  alt="Preview"
                  className="max-h-[70vh] max-w-[95vw] sm:max-h-[80vh] sm:max-w-[90vw] rounded-lg border-4 border-white shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                />
                <button
                  className="absolute -top-4 -right-4 w-12 h-12 flex items-center justify-center bg-[#c9ada7] bg-opacity-90 rounded-full text-white text-4xl font-bold shadow-lg hover:bg-[#b5838d] hover:scale-110 transition-all z-50"
                  onClick={() => setPreviewImg(null)}
                  aria-label="Close preview"
                  style={{ lineHeight: 1 }}
                >
                  ×
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
