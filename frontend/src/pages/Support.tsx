import { Phone, Mail, MessageSquare, Send, AlertCircle } from "lucide-react";
import React, { useState } from "react";

export function SupportPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] py-20 px-4">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 text-transparent bg-clip-text">
            Customer Support
          </h1>
          <p className="text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            We're here to help. Report an issue, ask a question, or just get in touch.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mt-8">
          {/* Contact Info Column */}
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold border-b border-[var(--color-border)] pb-2">
              Contact Information
            </h2>

            <div className="grid gap-4">
              <div className="flex items-start gap-4 p-6 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] hover:border-indigo-500/50 transition-colors">
                <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-[var(--color-text)]">Phone Support</h3>
                  <p className="text-[var(--color-text-secondary)] text-sm mb-2">Available Mon-Fri, 9am - 5pm EST</p>
                  <a href="tel:+40771027429" className="text-2xl font-bold tracking-wider text-indigo-400 hover:text-indigo-300 transition-colors">
                    +40 771 027 429
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] hover:border-blue-500/50 transition-colors">
                <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-[var(--color-text)]">Email Support</h3>
                  <p className="text-[var(--color-text-secondary)] text-sm mb-2">We typically respond within 24 hours.</p>
                  <a href="mailto:2005dawut55@gmail.com" className="text-xl font-medium tracking-wide text-blue-400 hover:text-blue-300 transition-colors">
                    2005dawut55@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-4 p-6 rounded-2xl border border-amber-500/20 bg-amber-500/5">
              <div className="flex gap-3">
                <AlertCircle className="w-6 h-6 text-amber-500 shrink-0" />
                <div>
                  <h4 className="font-semibold text-amber-500 mb-1">Before reporting an issue</h4>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    Please ensure you have checked our Documentation and FAQ sections. Providing steps to reproduce your issue will help us resolve it much faster!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold border-b border-[var(--color-border)] pb-2">
              Report an Issue
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5 bg-[var(--color-bg-secondary)] p-8 rounded-3xl border border-[var(--color-border)] shadow-lg">

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-[var(--color-text-secondary)] ml-1">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="E.g., Sandbox environment not loading"
                  className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-[var(--color-text-secondary)] ml-1">Issue Type</label>
                <select className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all appearance-none cursor-pointer">
                  <option>Bug Report</option>
                  <option>Feature Request</option>
                  <option>Billing Issue</option>
                  <option>Account Assistance</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-[var(--color-text-secondary)] ml-1">Description</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Please describe the issue in detail. If it's a bug, include steps to reproduce."
                  className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitted}
                className="mt-2 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 active:scale-95 shadow-md hover:shadow-indigo-500/25 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitted ? (
                  <>Message Sent! <MessageSquare className="w-5 h-5" /></>
                ) : (
                  <>Send Message <Send className="w-5 h-5" /></>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
