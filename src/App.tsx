import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./lib/firebase";

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Guitar from "./pages/Guitar";
import English from "./pages/English";
import CourseDetail from "./pages/CourseDetail";
import QuizPage from "./pages/QuizPage";
import MyProgress from "./pages/MyProgress";
import LoginPage from "./pages/LoginPage/Login";
import SignupPage from "./pages/LoginPage/Signup";
import AdminPage from "./pages/AdminPanel";
import PlaylistPage from "./pages/Playlist/PlaylistPage";
import MusicPage from "./pages/Playlist/MusicPage";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [user, loading] = useAuthState(auth);
  if (loading) return <div className="p-4">Loading...</div>;
  return user ? <>{children}</> : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#f4f1ee] dark:bg-[#22223b] text-[#4a4e69] dark:text-[#f2e9e4]">
        <Navbar />
        <main className="pt-20 px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/guitar" element={<Guitar />} />
            <Route path="/english" element={<English />} />
            <Route path="/course/:id" element={<CourseDetail />} />
            <Route path="/quiz/:id" element={<QuizPage />} />
            <Route path="/progress" element={<MyProgress />} />
						<Route path="/playlist" element={<PlaylistPage />} />
						<Route path="/music" element={<MusicPage />} />


            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
