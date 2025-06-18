// src/utils/firestoreUtils.ts
import { db } from "../lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  addDoc,
  setDoc,
} from "firebase/firestore";
import { User } from "firebase/auth";

// 🧠 Fetch quiz questions by course ID
export async function getQuizByCourseId(courseId: string) {
  const q = query(collection(db, "quizzes"), where("courseId", "==", courseId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data());
}

// ✅ Save user quiz result (score) to Firestore
export async function saveQuizResult({
  user,
  courseId,
  score,
}: {
  user: User | null;
  courseId: string;
  score: number;
}) {
  const courseTitle = await getCourseTitle(courseId);
  const docRef = user
    ? doc(db, "results", `${user.uid}_${courseId}`)
    : doc(db, "results", `guest_${courseId}_${Date.now()}`);

  await setDoc(docRef, {
    userId: user?.uid ?? "guest",
    courseId,
    courseTitle,
    score,
    timestamp: Date.now(),
  });
}

// 🎯 Get course title by ID
export async function getCourseTitle(courseId: string): Promise<string> {
  const ref = doc(db, "courses", courseId);
  const snapshot = await getDoc(ref);
  return snapshot.exists() ? snapshot.data().title : "Unknown Course";
}

// 📚 Reuse: Fetch courses by topic ("guitar" or "english")
export async function fetchCoursesByTopic(topic: string) {
  const q = query(collection(db, "courses"), where("topic", "==", topic));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// 🎓 Fetch course by ID
export async function getCourseById(id: string) {
  const ref = doc(db, "courses", id);
  const snap = await getDoc(ref);
  return snap.exists() ? { id, ...snap.data() } : null;
}
