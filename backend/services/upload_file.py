import uuid
from pathlib import Path
from fastapi import HTTPException, BackgroundTasks, UploadFile
from sqlmodel import Session

from core.config import settings
from models import Document
from schemas.document import DocumentMetadata, DocumentUploadResponse
from services.document_processing import process_document

ALLOWED_EXTENSIONS = {".pdf", ".docx", ".txt", ".md"}
ALLOWED_CONTENT_TYPES = {
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
    "text/markdown",
}

def _get_upload_root() -> Path:
    backend_root = Path(__file__).resolve().parent.parent.parent
    return (backend_root / settings.UPLOAD_DIR).resolve()


def _validate_file(filename: str, content_type: str | None) -> None:
    suffix = Path(filename).suffix.lower()
    if suffix not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"File type not allowed. Allowed: {', '.join(sorted(ALLOWED_EXTENSIONS))}",
        )
    if content_type and content_type not in ALLOWED_CONTENT_TYPES:
        pass


def upload_file(file:UploadFile,user_id:int,db:Session,background_tasks:BackgroundTasks, learning_path_id: int | None = None):
    
    _validate_file(file.filename or "", file.content_type)

    upload_root = _get_upload_root()
    user_dir = upload_root / "documents" / str(user_id)
    user_dir.mkdir(parents=True, exist_ok=True)

    suffix = Path(file.filename or "file").suffix.lower()
    unique_name = f"{uuid.uuid4().hex}{suffix}"
    file_path = user_dir / unique_name
    source_rel = f"documents/{user_id}/{unique_name}"

    try:
        contents = file.file.read()
    finally:
        file.file.close()

    file_path.write_bytes(contents)

    title = file.filename or unique_name
    if len(title) > 512:
        title = title[:509] + "..."

    doc = Document(
        user_id=user_id,
        learning_path_id=learning_path_id,
        title=title,
        source=source_rel,
    )
    db.add(doc)
    db.commit()
    db.refresh(doc)

    background_tasks.add_task(process_document, doc.id)

    return DocumentUploadResponse(
        document=DocumentMetadata.model_validate(doc),
    )