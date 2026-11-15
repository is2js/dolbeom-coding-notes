from pathlib import Path
from contextlib import closing
import sqlite3

from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from sample_data import LESSONS

HERE = Path(__file__).resolve().parent
app = FastAPI()
app.mount("/static", StaticFiles(directory=HERE / "static"), name="static")
templates = Jinja2Templates(directory=str(HERE / "templates"))


def read_lessons_from_db():
    database = HERE / "courses.sqlite3"
    if not database.is_file():
        raise HTTPException(status_code=503, detail="먼저 seed.py를 실행해 연습 DB를 준비하세요.")
    with closing(sqlite3.connect(database)) as connection:
        connection.row_factory = sqlite3.Row
        rows = connection.execute("SELECT title, minutes, description FROM lessons ORDER BY id").fetchall()
        return [dict(row) for row in rows]


@app.get("/api/dict")
def api_dict():
    # Python의 리스트와 딕셔너리를 FastAPI가 JSON 응답으로 변환합니다.
    return LESSONS


@app.get("/api/sqlite")
def api_sqlite():
    # SQLite 행을 딕셔너리 목록으로 바꿔 JSON 응답으로 보냅니다.
    return read_lessons_from_db()


@app.get("/sqlite", response_class=HTMLResponse)
def template_sqlite(request: Request):
    # 같은 SQLite 데이터를 Jinja2에 건네 HTML을 응답합니다.
    return templates.TemplateResponse(
        request=request, name="cards.html",
        context={"lessons": read_lessons_from_db(), "source": "SQLite 데이터베이스"},
    )
