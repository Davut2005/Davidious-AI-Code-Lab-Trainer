from typing import Any, List

from sqlalchemy import text

from database import engine

def _embedding_to_pgvector(embedding: List[float]) -> str:
    """Convert Python list of floats to pgvector literal string."""
    return "[" + ",".join(str(f) for f in embedding) + "]"


def insert_chunk_embedding(
    chunk_id: str,
    document_id: str,
    content: str,
    embedding: List[float],
) -> None:

    embedding_str = _embedding_to_pgvector(embedding)
    with engine.connect() as conn:
        conn.execute(
            text("""
                UPDATE document_chunks
                SET embedding = :embedding \:\:vector
                WHERE id = :chunk_id
            """),
            {"chunk_id": chunk_id, "embedding": embedding_str},
        )
        conn.commit()


def search_similar_chunks(
    embedding: List[float],
    top_k: int,
) -> List[dict[str, Any]]:

    embedding_str = _embedding_to_pgvector(embedding)
    with engine.connect() as conn:
        result = conn.execute(
            text("""
                SELECT id, document_id, content
                FROM document_chunks
                WHERE embedding IS NOT NULL
                ORDER BY embedding <-> :embedding \:\:vector
                LIMIT :top_k
            """),
            {"embedding": embedding_str, "top_k": top_k},
        )
        rows = result.fetchall()
    return [
        {"id": str(row[0]), "document_id": str(row[1]), "text": row[2] or ""}
        for row in rows
    ]
