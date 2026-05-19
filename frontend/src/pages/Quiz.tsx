import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    getLearningPaths,
    getQuizForPath,
    submitQuiz,
} from "../api/api";
import type { LearningPathSummary } from "../types/types";
import type { QuizQuestion, QuizSummary } from "../api/api";

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
            <div className="page quiz-page">
                <p className="muted">Loading…</p>
            </div>
        );
    }

    /* ── Phase: Pick a learning path ── */
    if (phase === "pick") {
        return (
            <div className="page quiz-page">
                <div className="quiz-header">
                    <h1>Quiz</h1>
                    <p className="muted">
                        Test your knowledge on any learning path. Pick one below to start.
                    </p>
                </div>

                {error && <div className="message err">{error}</div>}

                {paths.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">📝</div>
                        <p>No learning paths with questions yet.</p>
                        <Link to="/paths/new" className="btn-primary" style={{ marginTop: "1rem" }}>
                            Create a Learning Path
                        </Link>
                    </div>
                ) : (
                    <div className="quiz-path-grid">
                        {paths.map((p) => (
                            <button
                                key={p.id}
                                className="quiz-path-card"
                                onClick={() => startQuiz(p)}
                            >
                                <div className="quiz-path-icon">🧠</div>
                                <div className="quiz-path-info">
                                    <h3>{p.title}</h3>
                                    {p.description && (
                                        <p className="quiz-path-desc">{p.description}</p>
                                    )}
                                    <div className="quiz-path-meta">
                                        <span>📅 {p.total_days ?? 0} days</span>
                                        <span>📄 {p.document_count} source{p.document_count !== 1 ? "s" : ""}</span>
                                    </div>
                                </div>
                                <span className="quiz-path-arrow">→</span>
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

        return (
            <div className="page quiz-page">
                <div className="quiz-topbar">
                    <button className="btn-sm" onClick={resetQuiz}>← Back</button>
                    <div className="quiz-topbar-info">
                        <span className="quiz-path-name">{selectedPath?.title}</span>
                        <span className="quiz-counter">
                            {currentIdx + 1} / {questions.length}
                        </span>
                    </div>
                    <span className="quiz-answered">{answeredCount} answered</span>
                </div>

                {/* Progress bar */}
                <div className="quiz-progress-bar">
                    <div className="quiz-progress-fill" style={{ width: `${progress}%` }} />
                </div>

                {error && <div className="message err">{error}</div>}

                <div className="quiz-card">
                    <div className="quiz-card-header">
                        <span className="quiz-concept-badge">{q.concept_name}</span>
                        <span className={`quiz-difficulty quiz-diff-${difficulty}`}>
                            {difficulty}
                        </span>
                    </div>

                    <h2 className="quiz-question-text">{q.question_text}</h2>

                    <textarea
                        className="quiz-answer-input"
                        placeholder="Type your answer here…"
                        value={currentAnswer}
                        onChange={(e) => handleAnswer(e.target.value)}
                        rows={4}
                    />

                    {showAnswer && (
                        <div className="quiz-reveal-answer">
                            <strong>Correct Answer:</strong>
                            <p>{q.correct_answer}</p>
                        </div>
                    )}

                    <div className="quiz-actions">
                        <div className="quiz-nav-group">
                            <button
                                className="btn-sm"
                                onClick={goPrev}
                                disabled={currentIdx === 0}
                            >
                                ← Prev
                            </button>
                            <button
                                className="btn-sm"
                                onClick={() => setShowAnswer(!showAnswer)}
                            >
                                {showAnswer ? "Hide answer" : "Show answer"}
                            </button>
                            <button
                                className="btn-sm"
                                onClick={goNext}
                                disabled={currentIdx === questions.length - 1}
                            >
                                Next →
                            </button>
                        </div>

                        {answeredCount === questions.length && (
                            <button
                                className="btn-primary quiz-submit-btn"
                                onClick={handleSubmit}
                                disabled={submitting}
                            >
                                {submitting ? "Submitting…" : "Submit Quiz"}
                            </button>
                        )}
                    </div>
                </div>

                {/* Question dots */}
                <div className="quiz-dots">
                    {questions.map((_, i) => (
                        <button
                            key={i}
                            className={`quiz-dot ${i === currentIdx ? "active" : ""} ${answers[questions[i].id]?.trim() ? "answered" : ""}`}
                            onClick={() => { setCurrentIdx(i); setShowAnswer(false); }}
                            title={`Question ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        );
    }

    /* ── Phase: Results ── */
    if (phase === "results" && summary) {
        const scoreColor =
            summary.score_percent >= 80
                ? "#34d399"
                : summary.score_percent >= 50
                    ? "#facc15"
                    : "#f87171";

        return (
            <div className="page quiz-page">
                <div className="quiz-results-header">
                    <h1>Quiz Results</h1>
                    <p className="muted">{selectedPath?.title}</p>
                </div>

                <div className="quiz-score-card">
                    <div className="quiz-score-circle" style={{ borderColor: scoreColor }}>
                        <span className="quiz-score-number" style={{ color: scoreColor }}>
                            {summary.score_percent}%
                        </span>
                        <span className="quiz-score-label">Score</span>
                    </div>
                    <div className="quiz-score-details">
                        <div className="quiz-stat">
                            <span className="quiz-stat-value">{summary.correct}</span>
                            <span className="quiz-stat-label">Correct</span>
                        </div>
                        <div className="quiz-stat">
                            <span className="quiz-stat-value">{summary.total - summary.correct}</span>
                            <span className="quiz-stat-label">Wrong</span>
                        </div>
                        <div className="quiz-stat">
                            <span className="quiz-stat-value">{summary.total}</span>
                            <span className="quiz-stat-label">Total</span>
                        </div>
                    </div>
                </div>

                <h2 className="section-title" style={{ marginTop: "2rem" }}>Review</h2>
                <div className="quiz-review-list">
                    {summary.results.map((r, i) => {
                        const q = questions.find((x) => x.id === r.question_id);
                        return (
                            <div
                                key={r.question_id}
                                className={`quiz-review-card ${r.was_correct ? "correct" : "wrong"}`}
                            >
                                <div className="quiz-review-indicator">
                                    {r.was_correct ? "✓" : "✗"}
                                </div>
                                <div className="quiz-review-body">
                                    <p className="quiz-review-q">
                                        <strong>Q{i + 1}:</strong> {q?.question_text}
                                    </p>
                                    <p className="quiz-review-your">
                                        <span>Your answer:</span> {answers[r.question_id] || <em>no answer</em>}
                                    </p>
                                    {!r.was_correct && (
                                        <p className="quiz-review-correct">
                                            <span>Correct:</span> {r.correct_answer}
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="quiz-results-actions">
                    <button className="btn-primary" onClick={() => startQuiz(selectedPath!)}>
                        Retake Quiz
                    </button>
                    <button className="btn-sm" onClick={resetQuiz}>
                        Pick Another Path
                    </button>
                </div>
            </div>
        );
    }

    return null;
}
