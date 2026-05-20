
from fastapi import HTTPException
from sqlmodel import Session, select
from sqlalchemy.exc import OperationalError

from database import get_db
from models import Document, DocumentChunk, User
from models.learning_path import LearningPath
from models.daily_study_plan import DailyStudyPlan
from schemas.learning_path import (
    DailyStudyPlanOut,
    LearningPathCreate,
    LearningPathOut,
    LearningPathSummary,
)
from core.config import settings

from services.upload_file import upload_file
from services.upload_youtube import upload_youtube



def _get_path_or_404(path_id: int, user_id: int, db: Session) -> LearningPath:

    path = db.get(LearningPath, path_id)
    if not path or path.user_id != user_id:
        raise HTTPException(status_code=404, detail="Learning path not found")
    return path


# CRUD operations

def create_learning_path(db: Session, user: User, payload: LearningPathCreate) -> LearningPathOut:

    path = LearningPath(
        user_id=user.id,
        title=payload.title,
        description=payload.description,
        hours_per_day=payload.hours_per_day,
        status="ready",
    )
    db.add(path)
    db.commit()
    db.refresh(path)
    return LearningPathOut(**path.model_dump(), daily_plans=[])


def list_learning_paths(db: Session, user: User) -> list[LearningPathSummary]:

    try:
        paths = list(
            db.exec(
                select(LearningPath)
                .where(LearningPath.user_id == user.id)
                .order_by(LearningPath.created_at.desc())
            ).all()
        )
        result: list[LearningPathSummary] = []
        for p in paths:
            doc_count = db.exec(
                select(Document).where(Document.learning_path_id == p.id)
            ).all()
            result.append(
                LearningPathSummary(**p.model_dump(), document_count=len(doc_count))
            )
        return result
    except OperationalError:
        return []


def get_learning_path(db: Session, user: User, path_id: int) -> LearningPathOut:

    path = _get_path_or_404(path_id, user.id, db)
    plans = list(
        db.exec(
            select(DailyStudyPlan)
            .where(DailyStudyPlan.learning_path_id == path_id)
            .order_by(DailyStudyPlan.day_number)
        ).all()
    )
    return LearningPathOut(
        **path.model_dump(),
        daily_plans=[DailyStudyPlanOut.model_validate(p) for p in plans],
    )


def delete_learning_path(db: Session, user: User, path_id: int) -> None:
    """Delete a learning path and all its associated daily study plans."""
    path = _get_path_or_404(path_id, user.id, db)
    # Delete dependent daily plans first
    plans = list(
        db.exec(select(DailyStudyPlan).where(DailyStudyPlan.learning_path_id == path_id)).all()
    )
    for plan in plans:
        db.delete(plan)
    db.delete(path)
    db.commit()

# Sources

def add_document_to_path(
    db: Session,
    user: User,
    path_id: int,
    file,
    background_tasks,
) -> dict:

    path = _get_path_or_404(path_id, user.id, db)
    # Use the shared upload_file service – it returns the response model.
    upload_file(file=file, user_id=user.id, db=db, background_tasks=background_tasks, learning_path_id=path.id)
    # Mark the path as processing so the frontend knows work is pending.
    path.status = "processing"
    db.add(path)
    db.commit()
    return {"status": "processing"}


def add_youtube_to_path(
    db: Session,
    user: User,
    path_id: int,
    youtube_url: str,
    background_tasks,
) -> dict:

    path = _get_path_or_404(path_id, user.id, db)
    # The service validates the URL, creates Document & DocumentChunk, and
    # schedules background processing.
    upload_youtube(youtube_url=youtube_url, user_id=user.id, path_id=path_id, db=db, background_tasks=background_tasks)
    path.status = "processing"
    db.add(path)
    db.commit()
    return {"status": "processing"}
