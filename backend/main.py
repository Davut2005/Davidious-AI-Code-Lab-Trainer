from fastapi import FastAPI
from database import create_tables
from fastapi.middleware.cors import CORSMiddleware
from api import auth, document, youtube, learning_path, quiz

create_tables()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "http://127.0.0.1:5174" ],
    allow_headers=["*"],
    allow_methods=["*"]
)

app.include_router(auth.router)
app.include_router(document.router)
app.include_router(youtube.router)
app.include_router(learning_path.router)
app.include_router(quiz.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app", host="127.0.0.1", port=8000, reload=True)
