import React from 'react';

export function TermsOfServicePage() {
    return (
        <div className="flex-1 flex flex-col items-center p-8 bg-gradient-to-br from-[var(--color-bg)] to-[var(--color-bg-secondary)]">
            <div className="max-w-4xl w-full flex flex-col gap-8 mt-8">
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Terms of Service</h1>
                    <p className="text-xl text-[var(--color-text-secondary)]">Please read these terms carefully before using Davidious.</p>
                </div>
                
                <div className="p-10 rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg)] shadow-xl leading-relaxed space-y-6">
                    <section>
                        <h2 className="text-2xl font-bold text-blue-400 mb-4">1. Acceptance of Terms</h2>
                        <p className="text-[var(--color-text)]">
                            By accessing or using the Davidious AI Code Lab Trainer, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions, then you may not access the website or use any of our services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-blue-400 mb-4">2. User Accounts</h2>
                        <p className="text-[var(--color-text)]">
                            You are responsible for safeguarding the password that you use to access your account and for any activities or actions under your password. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-blue-400 mb-4">3. Acceptable Use</h2>
                        <p className="text-[var(--color-text)]">
                            You agree not to misuse the Davidious platform. This includes, but is not limited to: attempting to bypass security measures, using the AI in ways it was not intended (e.g., generating malicious code), or harassing other users. We reserve the right to suspend or terminate accounts that violate these guidelines.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-blue-400 mb-4">4. Intellectual Property</h2>
                        <p className="text-[var(--color-text)]">
                            The service and its original content, features, and functionality are and will remain the exclusive property of Davidious and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Davidious.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
