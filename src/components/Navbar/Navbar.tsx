// import { Link, useNavigate } from "react-router-dom";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "../../lib/firebase";
// import { useEffect, useState } from "react";
// import { Sun, Moon, Menu, X } from "lucide-react";
// import { signOut } from "firebase/auth";

// export default function Navbar() {
//   const [user] = useAuthState(auth);
//   const navigate = useNavigate();
//   const [darkMode, setDarkMode] = useState(
//     () => localStorage.getItem("theme") === "dark"
//   );
//   const [menuOpen, setMenuOpen] = useState(false);

//   useEffect(() => {
//     document.documentElement.classList.toggle("dark", darkMode);
//     localStorage.setItem("theme", darkMode ? "dark" : "light");
//   }, [darkMode]);

//   const handleLogout = async () => {
//     await signOut(auth);
//     navigate("/login");
//   };

//   return (
//     <header className="bg-[#f2e9e4] dark:bg-[#22223b] text-[#4a4e69] dark:text-[#f2e9e4] shadow">
//       <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
//         <Link to="/" className="text-xl font-bold">
//           🌸 Studyme
//         </Link>

//         <div className="flex items-center gap-4">
//           <button onClick={() => setDarkMode(!darkMode)}>
//             {darkMode ? (
//               <Sun className="w-5 h-5" />
//             ) : (
//               <Moon className="w-5 h-5" />
//             )}
//           </button>

//           {/* Mobile menu button */}
//           <button
//             className="md:hidden text-2xl"
//             onClick={() => setMenuOpen(!menuOpen)}
//             aria-label="Toggle Menu"
//           >
//             ☰
//           </button>

//           {/* Menu Links */}
//           <nav
//             className={`flex-col md:flex-row md:flex gap-4 items-center absolute md:static top-16 left-0 right-0 bg-white dark:bg-gray-900 md:bg-transparent md:dark:bg-transparent px-4 md:px-0 py-4 md:py-0 transition-all duration-200 ${menuOpen ? "flex" : "hidden"}`}
//           >
//             <Link
//               to="/guitar"
//               onClick={() => setMenuOpen(false)}
//               className="text-gray-700 dark:text-gray-200 hover:underline"
//             >
//               Guitar
//             </Link>
//             <Link
//               to="/english"
//               onClick={() => setMenuOpen(false)}
//               className="text-gray-700 dark:text-gray-200 hover:underline"
//             >
//               English
//             </Link>
//             <Link
//               to="/progress"
//               onClick={() => setMenuOpen(false)}
//               className="text-gray-700 dark:text-gray-200 hover:underline"
//             >
//               Progress
//             </Link>

//             {/* {user ? (
//               <button onClick={() => signOut(auth)} className="text-red-500">
//                 Logout
//               </button>
//             ) : (
//               <Link to="/login" className="text-blue-500">
//                 Login
//               </Link>
//             )} */}

//             {user?.email === "admin@example.com" && (
//               <Link
//                 onClick={() => setMenuOpen(false)}
//                 to="/admin"
//                 className="hover:underline"
//               >
//                 Admin
//               </Link>
//             )}

//             {user ? (
//               <div className="flex items-center gap-3">
//                 <span className="text-sm hidden sm:inline">
//                   👋 {user.displayName || user.email}
//                 </span>
//                 <button
//                   onClick={() => {
//                     handleLogout();
//                     setMenuOpen(false);
//                   }}
//                   className="bg-[#c9ada7] hover:bg-[#b5838d] text-white px-3 py-1 rounded text-sm"
//                 >
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               <>
//                 <Link to="/login" className="text-sm hover:underline">
//                   Login
//                 </Link>
//               </>
//             )}
//           </nav>
//         </div>
//       </div>
//     </header>
//   );
// }
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../lib/firebase";
import { signOut } from "firebase/auth";
import { Sun, Moon } from "lucide-react";

export default function Navbar() {
  const [user] = useAuthState(auth);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollUp, setScrollUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrollUp(currentY < lastScrollY || currentY < 10);
      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-transform duration-300 ${
        scrollUp ? "translate-y-0" : "-translate-y-full"
      } bg-[#f2e9e4] dark:bg-[#22223b] text-[#4a4e69] dark:text-[#f2e9e4] shadow`}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-xl font-bold">
          🌸 Studyme
        </Link>

        <div className="flex items-center gap-4">
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            ☰
          </button>

          <nav
            className={`flex-col md:flex-row md:flex gap-4 items-center absolute md:static top-16 left-0 right-0 bg-white dark:bg-gray-900 md:bg-transparent md:dark:bg-transparent px-4 md:px-0 py-4 md:py-0 transition-all duration-200 ${
              menuOpen ? "flex" : "hidden"
            }`}
          >
            <Link
              to="/guitar"
              onClick={() => setMenuOpen(false)}
              className="hover:underline"
            >
              Guitar
            </Link>
            <Link
              to="/english"
              onClick={() => setMenuOpen(false)}
              className="hover:underline"
            >
              English
            </Link>
            <Link
              to="/progress"
              onClick={() => setMenuOpen(false)}
              className="hover:underline"
            >
              Progress
            </Link>
            <Link
              to="/playlist"
              onClick={() => setMenuOpen(false)}
              className="hover:underline"
            >
              Playlist
            </Link>

            <Link
              to="/music"
              onClick={() => setMenuOpen(false)}
              className="hover:underline"
            >
              Music
            </Link>

            {user?.email === "admin@example.com" && (
              <Link
                onClick={() => setMenuOpen(false)}
                to="/admin"
                className="hover:underline"
              >
                Admin
              </Link>
            )}

            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm hidden sm:inline">
                  👋 {user.displayName || user.email}
                </span>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="bg-[#c9ada7] hover:bg-[#b5838d] text-white px-3 py-1 rounded text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="text-sm hover:underline">
                Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
