import { readFileSync } from 'node:fs';
import { validateCourse, courseMinutes, lessonMinutes } from '../src/course.js';
const c=validateCourse(JSON.parse(readFileSync(new URL('../public/data/course.json',import.meta.url),'utf8')));
console.table(c.lessons.map(l=>({강의:l.number,제목:l.shortTitle,본편:lessonMinutes(l),보충:lessonMinutes(l,true),시연:l.steps.length,본문글자:l.sections.reduce((n,s)=>n+s.body.length,0)})));
console.log(`본편 ${courseMinutes(c)}분 / 보충 ${courseMinutes(c,true)}분`);
for (const lesson of c.lessons) {
  if (lessonMinutes(lesson) <= 0) {
    console.error(`${lesson.shortTitle}: 본편 절을 하나 이상 지정해 주세요.`);
    process.exitCode = 1;
  }
}
