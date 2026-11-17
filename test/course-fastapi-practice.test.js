import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('the FastAPI completed practice file matches the three course snippets in order', () => {
  const course = JSON.parse(fs.readFileSync(new URL('../public/data/course.json', import.meta.url), 'utf8'));
  const lesson = course.lessons.find(item => item.id === 'templates');
  const steps = [['backend-python', 'from fastapi import FastAPI'], ['backend-sqlite', 'from pathlib import Path'], ['web-jinja', 'from fastapi import Request']];
  const blocks = steps.map(([id, prefix]) => {
    const body = lesson.sections.find(section => section.id === id).body;
    const found = [...body.matchAll(/```python\n([\s\S]*?)\n```/g)].find(match => match[1].startsWith(prefix));
    assert.ok(found, `${id} 실습 코드가 있어야 합니다`);
    return found[1];
  });
  const reference = fs.readFileSync(new URL('../public/examples/course-card/server-data/practice_complete.py', import.meta.url), 'utf8');
  assert.equal(reference.replace(/\r\n/g, '\n'), blocks.join('\n\n') + '\n');
});
