from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

HERE = Path(__file__).resolve().parent
app = FastAPI()
app.mount("/static", StaticFiles(directory=HERE.parent / "static"), name="static")
templates = Jinja2Templates(directory=str(HERE / "templates"))


@app.get("/", response_class=HTMLResponse)
@app.get("/lessons", response_class=HTMLResponse)
def index(request: Request):
    lessons = [
        {"title": "윈도우 터미널", "minutes": 30, "description": "폴더 위치를 확인하고 탐색기와 오갑니다."},
        {"title": "Git", "minutes": 25, "description": "변경을 확인하고 기록합니다."},
    ]
    return templates.TemplateResponse(request=request, name="cards.html", context={"lessons": lessons})
