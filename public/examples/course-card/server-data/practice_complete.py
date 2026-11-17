from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from sample_data import LESSONS

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/api/dict")
def api_dict():
    return LESSONS

from pathlib import Path
from contextlib import closing
import sqlite3
from fastapi import HTTPException

def read_lessons_from_db():
    database = Path(__file__).resolve().parent / "courses.sqlite3"
    if not database.is_file():
        raise HTTPException(status_code=503, detail="먼저 seed.py를 실행하세요.")
    with closing(sqlite3.connect(database)) as connection:
        connection.row_factory = sqlite3.Row
        rows = connection.execute(
            "SELECT title, minutes, description FROM lessons ORDER BY id"
        ).fetchall()
        return [dict(row) for row in rows]

@app.get("/api/sqlite")
def api_sqlite():
    return read_lessons_from_db()

from fastapi import Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

templates = Jinja2Templates(directory="templates")

@app.get("/sqlite", response_class=HTMLResponse)
def template_sqlite(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="cards.html",
        context={"lessons": read_lessons_from_db(), "source": "SQLite 데이터베이스"},
    )
