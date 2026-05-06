import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer
            className="w-full border-t py-12 px-8 transition-colors duration-300 mt-auto"
            style={{
                borderColor: "var(--color-border)",
                backgroundColor: "var(--color-bg)",
                color: "var(--color-text-secondary)"
            }}
        >
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
                {/* Brand & Social Column */}
                <div className="flex flex-col gap-6 md:w-1/3">
                    <Link
                        to="/"
                        className="text-2xl font-extrabold tracking-tighter bg-gradient-to-br from-emerald-400 via-blue-500 to-emerald-500 bg-[length:300%_100%] text-transparent bg-clip-text inline-block"
                    >
                        Davidious
                    </Link>

                    {/* Social Icons (Placeholders using SVG) */}
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-[var(--color-text)] transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
                        </a>
                        <a href="#" className="hover:text-[var(--color-text)] transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm-1-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm5 7h-2v-6h2v6z" /></svg>
                        </a>
                        <a href="#" className="hover:text-[var(--color-text)] transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.47 2 2 6.47 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.69c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .26.18.58.69.48C19.13 20.17 22 16.42 22 12c0-5.53-4.47-10-10-10z" /></svg>
                        </a>
                        <a href="#" className="hover:text-[var(--color-text)] transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.05c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" /></svg>
                        </a>
                    </div>

                    <div className="text-xs space-y-1 mt-4 text-[var(--color-text-muted)]">
                        <p>© 2026 Davidious. All rights reserved.</p>
                        <p>Lab-Trainer License</p>
                        <p>Code Innovation Hub</p>
                    </div>
                </div>

                {/* Links Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full">
                    {/* Column 1 */}
                    <div className="flex flex-col gap-3">
                        <h3 className="font-semibold text-sm text-[var(--color-text)] mb-2">Products</h3>
                        <Link to="/codelab" className="text-sm hover:text-[var(--color-text)] transition-colors">Code Lab</Link>
                    </div>

                    {/* Column 2 */}
                    <div className="flex flex-col gap-3">
                        <h3 className="font-semibold text-sm text-[var(--color-text)] mb-2">Resources</h3>
                        <a href="#" className="text-sm hover:text-[var(--color-text)] transition-colors">Documentation</a>
                        <a href="#" className="text-sm hover:text-[var(--color-text)] transition-colors">API Reference</a>
                        <a href="#" className="text-sm hover:text-[var(--color-text)] transition-colors">Community</a>
                        <a href="#" className="text-sm hover:text-[var(--color-text)] transition-colors">Blog</a>
                    </div>

                    {/* Column 3 */}
                    <div className="flex flex-col gap-3">
                        <h3 className="font-semibold text-sm text-[var(--color-text)] mb-2">Legal & Safety</h3>
                        <a href="#" className="text-sm hover:text-[var(--color-text)] transition-colors">Privacy Policy</a>
                        <a href="#" className="text-sm hover:text-[var(--color-text)] transition-colors">Terms of Service</a>
                        <a href="#" className="text-sm hover:text-[var(--color-text)] transition-colors">Security</a>
                        <Link to="/support" className="text-sm hover:text-[var(--color-text)] transition-colors">Report Issue</Link>
                    </div>

                    {/* Column 4 */}
                    <div className="flex flex-col gap-3">
                        <h3 className="font-semibold text-sm text-[var(--color-text)] mb-2">Company</h3>
                        <a href="#" className="text-sm hover:text-[var(--color-text)] transition-colors">About Us</a>
                        <Link to="/careers" className="text-sm hover:text-[var(--color-text)] transition-colors">Careers</Link>
                        <a href="#" className="text-sm hover:text-[var(--color-text)] transition-colors">Contact</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
