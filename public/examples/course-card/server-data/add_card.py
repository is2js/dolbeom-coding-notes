"""생성한 연습 DB에 카드 한 개를 추가합니다. 기존 데이터는 유지합니다."""
from pathlib import Path
from contextlib import closing
import sqlite3

HERE = Path(__file__).resolve().parent
database = HERE / "courses.sqlite3"
if not database.is_file():
    raise SystemExit("먼저 seed.py를 실행해 연습 DB를 준비하세요.")

with closing(sqlite3.connect(database)) as connection, connection:
    already = connection.execute("SELECT 1 FROM lessons WHERE title = ?", ("마크다운",)).fetchone()
    if already:
        print("마크다운 카드가 이미 있어 기존 데이터를 유지합니다.")
    else:
        connection.execute(
            "INSERT INTO lessons (title, minutes, description) VALUES (?, ?, ?)",
            ("마크다운", 20, "문서를 보기 좋게 작성합니다."),
        )
        print("마크다운 카드를 DB에 추가했습니다.")
