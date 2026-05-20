import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    getLearningPaths,
    getQuizForPath,
    submitQuiz,
} from "../api/api";
import type { LearningPathSummary } from "../types/types";
import type { QuizQuestion, QuizSummary } from "../api/api";
import { sharedStyles } from "../styles/shared";

type Phase = "pick" | "quiz" | "results";

export default function QuizPage() {
    const [paths, setPaths] = useState<LearningPathSummary[]>([]);
    const [loading, setLoading] = useState(true);

    // Quiz state
    const [phase, setPhase] = useState<Phase>("pick");
    const [selectedPath, setSelectedPath] = useState<LearningPathSummary | null>(null);
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [submitting, setSubmitting] = useState(false);
    const [summary, setSummary] = useState<QuizSummary | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [showAnswer, setShowAnswer] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const data = await getLearningPaths();
                setPaths(data.filter((p) => p.status === "ready"));
            } catch (e) {
                setError((e as Error).message);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    async function startQuiz(path: LearningPathSummary) {
        setError(null);
        setSelectedPath(path);
        try {
            const qs = await getQuizForPath(path.id);
            if (qs.length === 0) {
                setError("No questions available for this learning path yet. Try adding more sources.");
                return;
            }
            // Shuffle questions
            const shuffled = [...qs].sort(() => Math.random() - 0.5);
            setQuestions(shuffled);
            setCurrentIdx(0);
            setAnswers({});
            setSummary(null);
            setShowAnswer(false);
            setPhase("quiz");
        } catch (e) {
            setError((e as Error).message);
        }
    }

    function handleAnswer(value: string) {
        setAnswers((prev) => ({ ...prev, [questions[currentIdx].id]: value }));
    }

    function goNext() {
        setShowAnswer(false);
        if (currentIdx < questions.length - 1) {
            setCurrentIdx((i) => i + 1);
        }
    }

    function goPrev() {
        setShowAnswer(false);
        if (currentIdx > 0) {
            setCurrentIdx((i) => i - 1);
        }
    }

    async function handleSubmit() {
        setSubmitting(true);
        setError(null);
        try {
            const payload = questions.map((q) => ({
                question_id: q.id,
                user_answer: answers[q.id] || "",
            }));
            const result = await submitQuiz(payload);
            setSummary(result);
            setPhase("results");
        } catch (e) {
            setError((e as Error).message);
        } finally {
            setSubmitting(false);
        }
    }

    function resetQuiz() {
        setPhase("pick");
        setSelectedPath(null);
        setQuestions([]);
        setCurrentIdx(0);
        setAnswers({});
        setSummary(null);
        setShowAnswer(false);
    }

    if (loading) {
        return (
            <div className={sharedStyles.page}>
                <div className="flex items-center justify-center min-h-[50vh]">
                    <div className={sharedStyles.progressSpinner} />
                </div>
            </div>
        );
    }

    /* ── Phase: Pick a learning path ── */
    if (phase === "pick") {
        return (
            <div className={sharedStyles.page}>
                <div className="mb-10 text-center sm:text-left">
                    <h1 className={sharedStyles.pageTitle}>Quiz Mode</h1>
                    <p className={`${sharedStyles.muted} mt-3 text-base`}>
                        Test your knowledge on any learning path. Pick one below to start.
                    </p>
                </div>

                {error && <div className={sharedStyles.messageErr}>{error}</div>}

                {paths.length === 0 ? (
                    <div className={sharedStyles.emptyState}>
                        <div className={sharedStyles.emptyIcon}>📝</div>
                        <p className="mb-6">No learning paths with questions yet.</p>
                        <Link to="/paths/new" className={sharedStyles.btnPrimary}>
                            Create a Learning Path
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {paths.map((p) => (
                            <button
                                key={p.id}
                                className="flex flex-col text-left bg-zinc-900/50 border border-white/10 rounded-2xl p-6 backdrop-blur-xl transition-all duration-300 hover:border-emerald-400/30 hover:shadow-[0_8px_30px_-12px_rgba(52,211,153,0.3)] hover:-translate-y-1 group relative overflow-hidden"
                                onClick={() => startQuiz(p)}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                <div className="flex items-start justify-between mb-4 relative z-10">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-blue-500/20 flex items-center justify-center border border-white/5 text-2xl group-hover:scale-110 transition-transform duration-300 shadow-inner">
                                        🧠
                                    </div>
                                    <span className="text-emerald-400 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                        →
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-zinc-100 mb-2 line-clamp-1 relative z-10 group-hover:text-emerald-400 transition-colors">{p.title}</h3>
                                {p.description && (
                                    <p className="text-sm text-zinc-400 line-clamp-2 mb-4 flex-1 relative z-10">{p.description}</p>
                                )}
                                <div className="flex items-center gap-4 text-xs font-medium text-zinc-500 mt-auto pt-4 border-t border-white/5 relative z-10 w-full">
                                    <span className="flex items-center gap-1.5 bg-zinc-950/50 px-2.5 py-1.5 rounded-lg border border-white/5">
                                        <span className="text-base">📅</span> {p.total_days ?? 0} days
                                    </span>
                                    <span className="flex items-center gap-1.5 bg-zinc-950/50 px-2.5 py-1.5 rounded-lg border border-white/5">
                                        <span className="text-base">📄</span> {p.document_count} source{p.document_count !== 1 ? "s" : ""}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    /* ── Phase: Taking the quiz ── */
    if (phase === "quiz") {
        const q = questions[currentIdx];
        const currentAnswer = answers[q.id] || "";
        const answeredCount = Object.values(answers).filter((a) => a.trim()).length;
        const progress = ((currentIdx + 1) / questions.length) * 100;
        const difficulty = q.options?.difficulty || "medium";

        // Map difficulty to colors
        const diffColor =
            difficulty === "hard" ? "text-red-400 bg-red-500/10 border-red-500/20" :
                difficulty === "easy" ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" :
                    "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";

        return (
            <div className={sharedStyles.page}>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                    <button className={`${sharedStyles.btnSm} hover:-translate-x-1`} onClick={resetQuiz}>← Back</button>
                    <div className="flex flex-col items-center text-center">
                        <span className="text-sm font-semibold text-zinc-300">{selectedPath?.title}</span>
                        <span className="text-xs font-medium text-zinc-500 mt-1">
                            Question {currentIdx + 1} of {questions.length}
                        </span>
                    </div>
                    <span className="text-sm font-medium text-emerald-400 px-3 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/20 shadow-[0_0_15px_rgba(52,211,153,0.15)]">
                        {answeredCount} answered
                    </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-zinc-900 rounded-full mb-8 overflow-hidden border border-white/5 shadow-inner">
                    <div
                        className="h-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-blue-500 transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {error && <div className={sharedStyles.messageErr}>{error}</div>}

                <div className="bg-zinc-900/40 border border-white/10 rounded-3xl p-6 md:p-10 backdrop-blur-xl shadow-2xl relative animate-[fadeIn_0.4s_ease-out]">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-3xl pointer-events-none" />

                    <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-8">
                        <span className="text-xs font-bold px-3 py-1.5 rounded-lg bg-zinc-800/80 text-zinc-300 border border-white/10 uppercase tracking-wider shadow-sm">
                            {q.concept_name}
                        </span>
                        <span className={`text-xs font-bold px-3 py-1.5 rounded-lg border uppercase tracking-wider shadow-sm ${diffColor}`}>
                            {difficulty}
                        </span>
                    </div>

                    <h2 className="relative z-10 text-2xl md:text-3xl font-bold text-zinc-100 mb-8 leading-relaxed">
                        {q.question_text}
                    </h2>

                    <div className="relative z-10">
                        <textarea
                            className="w-full bg-zinc-950/70 border border-white/10 rounded-2xl p-5 text-base text-zinc-100 placeholder-zinc-600 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/15 outline-none resize-y min-h-[160px] transition-all duration-200 shadow-inner font-sans"
                            placeholder="Type your answer here…"
                            value={currentAnswer}
                            onChange={(e) => handleAnswer(e.target.value)}
                        />
                    </div>

                    {showAnswer && (
                        <div className="relative z-10 mt-6 p-5 rounded-2xl bg-zinc-800/60 border border-white/10 text-zinc-300 text-sm animate-[slideDown_0.2s_ease-out] shadow-lg">
                            <strong className="flex items-center gap-2 text-emerald-400 mb-3 text-base">
                                <span className="text-xl">💡</span> Correct Answer
                            </strong>
                            <p className="leading-relaxed text-zinc-200 text-base">{q.correct_answer}</p>
                        </div>
                    )}

                    <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-8 border-t border-white/5">
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <button
                                className={`${sharedStyles.btnSm} flex-1 sm:flex-none py-2.5 px-5 hover:bg-zinc-800`}
                                onClick={goPrev}
                                disabled={currentIdx === 0}
                            >
                                ← Prev
                            </button>
                            <button
                                className={`${sharedStyles.btnSm} flex-1 sm:flex-none py-2.5 px-5 ${showAnswer ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'hover:bg-zinc-800'}`}
                                onClick={() => setShowAnswer(!showAnswer)}
                            >
                                {showAnswer ? "Hide Answer" : "Reveal Answer"}
                            </button>
                            <button
                                className={`${sharedStyles.btnSm} flex-1 sm:flex-none py-2.5 px-5 hover:bg-zinc-800`}
                                onClick={goNext}
                                disabled={currentIdx === questions.length - 1}
                            >
                                Next →
                            </button>
                        </div>

                        {answeredCount === questions.length && (
                            <button
                                className={`${sharedStyles.btnPrimary} w-full sm:w-auto mt-4 sm:mt-0 py-3 px-8 shadow-[0_0_20px_rgba(16,185,129,0.4)]`}
                                onClick={handleSubmit}
                                disabled={submitting}
                            >
                                {submitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                        Submitting…
                                    </>
                                ) : (
                                    "Submit Quiz"
                                )}
                            </button>
                        )}
                    </div>
                </div>

                {/* Question dots */}
                <div className="flex flex-wrap justify-center gap-3 mt-10">
                    {questions.map((_, i) => {
                        const isActive = i === currentIdx;
                        const isAnswered = !!answers[questions[i].id]?.trim();

                        let dotClass = "w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ";
                        if (isActive) {
                            dotClass += "bg-emerald-400 scale-125 ring-4 ring-emerald-400/20 shadow-[0_0_10px_rgba(52,211,153,0.5)]";
                        } else if (isAnswered) {
                            dotClass += "bg-emerald-500/60 hover:bg-emerald-400";
                        } else {
                            dotClass += "bg-white/10 hover:bg-white/25";
                        }

                        return (
                            <button
                                key={i}
                                className={dotClass}
                                onClick={() => { setCurrentIdx(i); setShowAnswer(false); }}
                                title={`Question ${i + 1}`}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }

    /* ── Phase: Results ── */
    if (phase === "results" && summary) {
        const scoreColor =
            summary.score_percent >= 80
                ? "#34d399" // emerald-400
                : summary.score_percent >= 50
                    ? "#facc15" // yellow-400
                    : "#f87171"; // red-400

        const scoreGradient =
            summary.score_percent >= 80 ? "from-emerald-500/20 to-emerald-500/5 border-emerald-500/30" :
                summary.score_percent >= 50 ? "from-yellow-500/20 to-yellow-500/5 border-yellow-500/30" :
                    "from-red-500/20 to-red-500/5 border-red-500/30";

        return (
            <div className={sharedStyles.page}>
                <div className="text-center mb-10">
                    <h1 className={sharedStyles.pageTitle}>Quiz Results</h1>
                    <p className={`${sharedStyles.muted} mt-3 text-lg`}>{selectedPath?.title}</p>
                </div>

                <div className={`flex flex-col items-center justify-center bg-gradient-to-b ${scoreGradient} border rounded-[2rem] p-10 mb-12 shadow-2xl relative overflow-hidden backdrop-blur-md`}>
                    <div className="absolute inset-0 bg-white/[0.02] mix-blend-overlay"></div>

                    <div className="relative z-10 w-44 h-44 rounded-full flex flex-col items-center justify-center mb-10 bg-zinc-950/60 backdrop-blur-md shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]" style={{ border: `8px solid ${scoreColor}` }}>
                        <span className="text-6xl font-black tracking-tighter drop-shadow-md" style={{ color: scoreColor }}>
                            {summary.score_percent}%
                        </span>
                        <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest mt-2">Score</span>
                    </div>

                    <div className="relative z-10 flex flex-wrap items-center justify-center gap-8 md:gap-16 w-full max-w-lg bg-zinc-950/40 p-6 rounded-2xl border border-white/5">
                        <div className="flex flex-col items-center flex-1">
                            <span className="text-3xl font-bold text-emerald-400 mb-1 drop-shadow-sm">{summary.correct}</span>
                            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Correct</span>
                        </div>
                        <div className="w-px h-12 bg-white/10 hidden sm:block"></div>
                        <div className="flex flex-col items-center flex-1">
                            <span className="text-3xl font-bold text-red-400 mb-1 drop-shadow-sm">{summary.total - summary.correct}</span>
                            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Wrong</span>
                        </div>
                        <div className="w-px h-12 bg-white/10 hidden sm:block"></div>
                        <div className="flex flex-col items-center flex-1">
                            <span className="text-3xl font-bold text-zinc-100 mb-1 drop-shadow-sm">{summary.total}</span>
                            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Total</span>
                        </div>
                    </div>
                </div>

                <h2 className={`${sharedStyles.sectionTitle} flex items-center gap-3`}>
                    Detailed Review
                    <span className="text-xs font-semibold text-zinc-400 bg-white/10 px-2.5 py-1 rounded-md ml-2 border border-white/5">
                        {summary.total} Questions
                    </span>
                </h2>

                <div className="flex flex-col gap-5 mt-6">
                    {summary.results.map((r, i) => {
                        const q = questions.find((x) => x.id === r.question_id);
                        const isCorrect = r.was_correct;
                        return (
                            <div
                                key={r.question_id}
                                className={`flex flex-col sm:flex-row gap-4 sm:gap-6 bg-zinc-900/60 border rounded-2xl p-6 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg backdrop-blur-sm ${isCorrect ? 'border-emerald-500/20 hover:border-emerald-500/40 hover:bg-emerald-500/10' : 'border-red-500/20 hover:border-red-500/40 hover:bg-red-500/10'}`}
                            >
                                <div className="flex-shrink-0 pt-1">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold shadow-inner ${isCorrect ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/20 text-red-400 border border-red-500/20'}`}>
                                        {isCorrect ? "✓" : "✗"}
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-lg text-zinc-100 font-bold leading-relaxed mb-5">
                                        <span className="text-zinc-500 font-normal mr-2">Q{i + 1}.</span> {q?.question_text}
                                    </p>

                                    <div className="bg-zinc-950/60 rounded-xl p-4 mb-4 border border-white/5 shadow-inner">
                                        <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                                            <span>Your Answer</span>
                                        </div>
                                        <p className={`text-base ${isCorrect ? 'text-emerald-400' : 'text-zinc-300'} leading-relaxed`}>
                                            {answers[r.question_id] || <em className="text-zinc-600">Skipped / No answer</em>}
                                        </p>
                                    </div>

                                    {!isCorrect && (
                                        <div className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/20 shadow-inner">
                                            <div className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                                                <span>Correct Answer</span>
                                            </div>
                                            <p className="text-base text-emerald-400 leading-relaxed font-medium">
                                                {r.correct_answer}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-14 pt-8 border-t border-white/10">
                    <button className={`${sharedStyles.btnPrimary} py-3.5 px-8 w-full sm:w-auto text-base shadow-[0_0_20px_rgba(16,185,129,0.3)]`} onClick={() => startQuiz(selectedPath!)}>
                        Retake This Quiz
                    </button>
                    <button className={`${sharedStyles.btnSm} py-3.5 px-8 w-full sm:w-auto text-base hover:bg-white/10`} onClick={resetQuiz}>
                        Choose Another Path
                    </button>
                </div>
            </div>
        );
    }

    return null;
}
