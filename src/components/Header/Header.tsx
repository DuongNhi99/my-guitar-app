import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-blue-700 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Learn Guitar & English</h1>
      <nav className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/guitar">Guitar</Link>
        <Link to="/english">English</Link>
      </nav>
    </header>
  );
}
