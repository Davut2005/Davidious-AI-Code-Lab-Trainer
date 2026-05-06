import { Outlet, Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import Footer from "./Footer";
function SunIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
    );
}

function MoonIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
    );
}

export default function Layout() {
    const { theme, toggleTheme } = useTheme();
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/");
    }

    return (
        <div
            className="min-h-screen font-sans flex flex-col transition-colors duration-300"
            style={{
                backgroundColor: "var(--color-bg)",
                backgroundImage: "var(--gradient-bg)",
                color: "var(--color-text)",
            }}
        >
            <nav
                className="flex items-center gap-2 px-8 py-4 backdrop-blur-md transition-colors duration-300"
                style={{ borderBottom: "1px solid var(--color-border)" }}
            >
                <Link
                    to="/"
                    className="text-xl font-extrabold tracking-tighter bg-gradient-to-br from-emerald-400 via-blue-500 to-emerald-500 bg-[length:300%_100%] text-transparent bg-clip-text transition-all duration-400 hover:bg-[100%_0] hover:scale-105 hover:drop-shadow-[0_0_12px_rgba(52,211,153,0.5)] active:scale-95 active:translate-y-px mr-4"
                >
                    Davidius
                </Link>

                <Link
                    to="/about"
                    className="nav-link"
                >
                    About Us
                </Link>

                {user && (
                    <>
                        <Link
                            to="/paths/new"
                            className="nav-link"
                        >
                            + New Path
                        </Link>
                        <Link
                            to="/paths"
                            className="nav-link"
                        >
                            My Paths
                        </Link>
                        <Link
                            to="/quiz"
                            className="nav-link"
                        >
                            Quiz
                        </Link>
                        <Link
                            to="/dashboard"
                            className="nav-link"
                        >
                            Dashboard
                        </Link>
                    </>
                )}

                <span className="flex-1" />

                {user ? (
                    <span className="flex items-center gap-3">
                        <span className="text-sm" style={{ color: "var(--color-text-secondary)" }}>{user.email}</span>
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="nav-link"
                        >
                            Log out
                        </button>
                    </span>
                ) : (
                    <>
                        <Link
                            to="/login"
                            className="nav-link"
                        >
                            Log in
                        </Link>
                        <Link
                            to="/register"
                            className="px-5 py-2 bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 bg-[length:300%_100%] text-white text-sm font-semibold rounded-md transition-all duration-400 hover:bg-[100%_0] hover:shadow-[0_6px_16px_-4px_rgba(16,185,129,0.7)] hover:-translate-y-0.5 active:translate-y-px active:scale-95"
                        >
                            Sign up
                        </Link>
                    </>
                )}

                <button
                    type="button"
                    onClick={toggleTheme}
                    aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                    className="nav-link ml-2 flex items-center gap-1.5"
                >
                    {theme === "dark" ? <SunIcon /> : <MoonIcon />}
                    <span>{theme === "dark" ? "Light" : "Dark"}</span>
                </button>
            </nav>

            <main className="flex-1 flex flex-col">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
