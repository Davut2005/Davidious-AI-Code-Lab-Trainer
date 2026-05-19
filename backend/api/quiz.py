from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, select

from database import get_db
from models import User, Document, Concept, Question
from models.question import QuestionReview
from models.learning_path import LearningPath
from api.auth import get_current_user
from schemas.question import QuestionOut
from pydantic import BaseModel

router = APIRouter(prefix="/quiz", tags=["quiz"])


class QuestionWithConcept(BaseModel):
    id: int
    concept_id: int
    concept_name: str
    question_text: str
    correct_answer: str
    options: dict | None = None

    model_config = {"from_attributes": True}


class AnswerSubmit(BaseModel):
    question_id: int
    user_answer: str


class AnswerResult(BaseModel):
    question_id: int
    was_correct: bool
    correct_answer: str


class QuizSummary(BaseModel):
    total: int
    correct: int
    score_percent: float
    results: list[AnswerResult]


@router.get("/learning-path/{path_id}", response_model=list[QuestionWithConcept])
def get_quiz_for_path(
    path_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> list[QuestionWithConcept]:
    """Get all quiz questions for a learning path (via its documents → concepts → questions)."""
    path = db.get(LearningPath, path_id)
    if not path or path.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Learning path not found")

    # Get all documents belonging to this learning path
    docs = list(
        db.exec(
            select(Document).where(Document.learning_path_id == path_id)
        ).all()
    )
    if not docs:
        return []

    doc_ids = [d.id for d in docs]

    # Get all concepts for these documents
    concepts = list(
        db.exec(
            select(Concept).where(Concept.document_id.in_(doc_ids))
        ).all()
    )
    if not concepts:
        return []

    concept_map = {c.id: c.name for c in concepts}
    concept_ids = list(concept_map.keys())

    # Get all questions for these concepts
    questions = list(
        db.exec(
            select(Question).where(Question.concept_id.in_(concept_ids))
        ).all()
    )

    return [
        QuestionWithConcept(
            id=q.id,
            concept_id=q.concept_id,
            concept_name=concept_map.get(q.concept_id, "Unknown"),
            question_text=q.question_text,
            correct_answer=q.correct_answer,
            options=q.options,
        )
        for q in questions
    ]


@router.post("/submit", response_model=QuizSummary)
def submit_quiz(
    answers: list[AnswerSubmit],
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> QuizSummary:
    """Submit quiz answers and get results."""
    results: list[AnswerResult] = []
    correct_count = 0

    for ans in answers:
        question = db.get(Question, ans.question_id)
        if not question:
            continue

        # Simple comparison (case-insensitive, stripped)
        was_correct = (
            ans.user_answer.strip().lower() == question.correct_answer.strip().lower()
        )
        if was_correct:
            correct_count += 1

        # Record review
        review = QuestionReview(
            question_id=ans.question_id,
            user_id=current_user.id,
            was_correct=was_correct,
        )
        db.add(review)

        results.append(
            AnswerResult(
                question_id=ans.question_id,
                was_correct=was_correct,
                correct_answer=question.correct_answer,
            )
        )

    db.commit()

    total = len(results)
    return QuizSummary(
        total=total,
        correct=correct_count,
        score_percent=round((correct_count / total * 100) if total > 0 else 0, 1),
        results=results,
    )
