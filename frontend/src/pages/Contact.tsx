import React from 'react';

export function ContactPage() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[var(--color-bg)] to-[var(--color-bg-secondary)]">
            <div className="max-w-3xl w-full flex flex-col gap-8 text-center">
                <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">Contact Us</h1>
                <p className="text-xl text-[var(--color-text-secondary)]">We'd love to hear from you. Get in touch with our team.</p>

                <div className="mt-8 p-12 rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg)] shadow-2xl transition-shadow duration-300 flex flex-col items-center gap-6 hover:shadow-[0_20px_50px_rgba(52,211,153,0.1)]">
                    <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-500 dark:text-emerald-400 shadow-inner">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-[var(--color-text)]">Call Us directly</h2>
                    <p className="text-[var(--color-text-secondary)] max-w-md mx-auto text-lg">
                        Have a question about Davidious? Need help getting started? Call our founders and we'll be happy to assist you!
                    </p>
                    <div className="mt-4 p-6 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 w-full max-w-sm">
                        <a href="tel:+40771027429" className="text-4xl font-black bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent hover:scale-110 transition-transform duration-300 inline-block">
                            +40 771 027 429
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
