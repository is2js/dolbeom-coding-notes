"""새 연습 DB에 Python 데이터 행을 한 번만 넣습니다. 기존 행은 덮어쓰지 않습니다."""
from pathlib import Path
from contextlib import closing
import sqlite3
from sample_data import LESSONS

HERE = Path(__file__).resolve().parent
with closing(sqlite3.connect(HERE / "courses.sqlite3")) as connection, connection:
    connection.execute("""
        CREATE TABLE IF NOT EXISTS lessons (
            id INTEGER PRIMARY KEY,
            title TEXT NOT NULL,
            minutes INTEGER NOT NULL,
            description TEXT NOT NULL
        )
    """)
    count = connection.execute("SELECT COUNT(*) FROM lessons").fetchone()[0]
    if count:
        print(f"기존 데이터 {count}건을 유지합니다. 다시 입력하지 않습니다.")
    else:
        connection.executemany(
            "INSERT INTO lessons (title, minutes, description) VALUES (?, ?, ?)",
            [(item["title"], item["minutes"], item["description"]) for item in LESSONS],
        )
        print(f"연습 카드 {len(LESSONS)}건을 SQLite에 저장했습니다.")
