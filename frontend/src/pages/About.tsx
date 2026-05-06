import React from 'react';

export function AboutPage() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[var(--color-bg)] to-[var(--color-bg-secondary)]">
            <div className="max-w-4xl w-full flex flex-col gap-8">
                <div className="text-center">
                    <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">About Us</h1>
                    <p className="text-xl text-[var(--color-text-secondary)]">Discover the story behind Davidious AI Code Lab Trainer.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <h2 className="text-2xl font-bold mb-4 text-emerald-400">Our Mission</h2>
                        <p className="text-[var(--color-text)] leading-relaxed">
                            Our mission is to empower developers of all skill levels by providing a cutting-edge AI-assisted coding environment. We believe that learning to code should be interactive, engaging, and accessible to everyone. By integrating advanced AI tools, we aim to accelerate the learning process and foster a community of innovative creators.
                        </p>
                    </div>

                    <div className="p-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <h2 className="text-2xl font-bold mb-4 text-blue-400">Our Vision</h2>
                        <p className="text-[var(--color-text)] leading-relaxed">
                            We envision a future where artificial intelligence and human creativity work hand-in-hand to build incredible software. Davidious is not just a tool, but a companion in your coding journey. We are constantly evolving to bring you the best features, the most intuitive interface, and the most robust learning paths.
                        </p>
                    </div>
                </div>

                <div className="p-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] shadow-lg text-center mt-8">
                    <h2 className="text-3xl font-bold mb-6">Meet the Team</h2>
                    <p className="text-[var(--color-text-secondary)] mb-6">We are a passionate team of developers, designers, and AI enthusiasts dedicated to making code education better.</p>
                    <div className="flex justify-center gap-12 flex-wrap mt-4">
                        <div className="flex flex-col items-center p-4">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-emerald-400 to-blue-500 mb-4 shadow-md flex items-center justify-center text-white text-3xl font-bold">D</div>
                            <span className="font-semibold text-xl">Davut</span>
                            <span className="text-sm text-[var(--color-text-secondary)]">Co-Founder</span>
                        </div>
                        <div className="flex flex-col items-center p-4">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 mb-4 shadow-md flex items-center justify-center text-white text-3xl font-bold">A</div>
                            <span className="font-semibold text-xl">Aylar</span>
                            <span className="text-sm text-[var(--color-text-secondary)]">Co-Founder</span>
                        </div>
                        <div className="flex flex-col items-center p-4">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 mb-4 shadow-md flex items-center justify-center text-white text-3xl font-bold">Y</div>
                            <span className="font-semibold text-xl">Yunus</span>
                            <span className="text-sm text-[var(--color-text-secondary)]">Co-Founder</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
