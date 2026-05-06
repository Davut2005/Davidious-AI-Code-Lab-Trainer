import React from 'react';

export function PrivacyPolicyPage() {
    return (
        <div className="flex-1 flex flex-col items-center p-8 bg-gradient-to-br from-[var(--color-bg)] to-[var(--color-bg-secondary)]">
            <div className="max-w-4xl w-full flex flex-col gap-8 mt-8">
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">Privacy Policy</h1>
                    <p className="text-xl text-[var(--color-text-secondary)]">Last updated: May 2026</p>
                </div>
                
                <div className="p-10 rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg)] shadow-xl leading-relaxed space-y-6">
                    <section>
                        <h2 className="text-2xl font-bold text-emerald-400 mb-4">1. Information We Collect</h2>
                        <p className="text-[var(--color-text)]">
                            At Davidious AI Code Lab Trainer, we collect information that you provide directly to us, such as when you create an account, update your profile, use our interactive learning tools, or communicate with us. This may include your name, email address, password, and any educational content you upload.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-emerald-400 mb-4">2. How We Use Your Information</h2>
                        <p className="text-[var(--color-text)]">
                            We use the information we collect to provide, maintain, and improve our services. This includes personalizing your learning experience, analyzing usage patterns to optimize our AI models, processing transactions, and sending you technical notices or support messages.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-emerald-400 mb-4">3. Data Sharing and Security</h2>
                        <p className="text-[var(--color-text)]">
                            We do not sell your personal data to third parties. We may share information with trusted service providers who assist us in operating our platform, subject to strict confidentiality agreements. We implement industry-standard security measures to protect your data against unauthorized access or disclosure.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-emerald-400 mb-4">4. Your Rights</h2>
                        <p className="text-[var(--color-text)]">
                            You have the right to access, correct, or delete your personal information. You can manage most of your data directly through your account settings. If you need further assistance or wish to completely erase your data, please contact our support team.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
