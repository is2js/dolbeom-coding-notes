import { readFileSync } from 'node:fs';
import { validateCourse, courseMinutes, lessonMinutes } from '../src/course.js';
const c=validateCourse(JSON.parse(readFileSync(new URL('../public/data/course.json',import.meta.url),'utf8')));
console.table(c.lessons.map(l=>({강의:l.number,제목:l.shortTitle,본편:lessonMinutes(l),보충:lessonMinutes(l,true),시연:l.steps.length,본문글자:l.sections.reduce((n,s)=>n+s.body.length,0)})));
console.log(`본편 ${courseMinutes(c)}분 / 보충 ${courseMinutes(c,true)}분`);
if(courseMinutes(c)!==180){console.error('기본 강의의 본편 합계가 180분과 다릅니다.');process.exitCode=1;}
