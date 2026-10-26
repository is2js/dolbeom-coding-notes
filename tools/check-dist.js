import { readFileSync, existsSync, statSync } from 'node:fs';
import { resolve, relative, isAbsolute, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateCourse, courseMinutes } from '../src/course.js';
import { resolvePagesBase } from './pages-base.js';

export function checkDist({ distDir, base = './', sourceCourseFile }) {
  const directory = resolve(distDir);
  const pagesBase = resolvePagesBase(base);
  // Test relative output under a nested URL as well, rather than only at /.
  const prefix = pagesBase === './' ? '/relative-site/' : pagesBase;
  const origin = 'https://pages-check.invalid';
  const entryURL = `${origin}${prefix}`;
  const seen = new Set();

  function inspectReference(reference, fromURL) {
    if (!reference || /^(?:#|data:|mailto:|tel:)/i.test(reference)) return;
    const url = new URL(reference, fromURL);
    if (url.origin !== origin) return;
    if (!url.pathname.startsWith(prefix)) {
      throw new Error(`배포 하위 경로를 벗어난 파일 참조: ${reference}`);
    }
    const local = resolve(directory, decodeURIComponent(url.pathname.slice(prefix.length)));
    const path = relative(directory, local);
    if (path.startsWith('..') || isAbsolute(path) || !existsSync(local) || !statSync(local).isFile()) {
      throw new Error(`배포 결과에서 파일을 찾을 수 없습니다: ${reference}`);
    }
    if (seen.has(local)) return;
    seen.add(local);
    if (/\.m?js$/.test(local)) {
      const script = readFileSync(local, 'utf8');
      if (/\/@vite\/client|\/__course-sync\b|import\.meta\.(?:env|hot)\b/.test(script)) {
        throw new Error(`배포 JavaScript에 로컬 개발 서버 전용 코드가 남아 있습니다: ${reference}`);
      }
    }
    if (local.endsWith('.css')) {
      const css = readFileSync(local, 'utf8');
      for (const match of css.matchAll(/url\(\s*["']?([^\s"')]+)["']?\s*\)/g)) {
        inspectReference(match[1], url.href);
      }
    }
  }

  const html = readFileSync(resolve(directory, 'index.html'), 'utf8');
  if (/<script\b[^>]*\bsrc\s*=\s*["'][^"']*\/@vite\/client/i.test(html)) {
    throw new Error('배포 HTML이 Vite 개발 클라이언트를 불러옵니다. 개발 원본 대신 빌드 결과를 배포해 주세요.');
  }
  for (const match of html.matchAll(/(?<![:\w-])(?:src|href)\s*=\s*["']([^"']+)["']/g)) {
    inspectReference(match[1], entryURL);
  }
  if (!seen.size) throw new Error('배포할 JavaScript·CSS 파일을 확인할 수 없습니다.');
  const shippedCourse = readFileSync(resolve(directory, 'data/course.json'), 'utf8');
  const course = validateCourse(JSON.parse(shippedCourse));
  if (sourceCourseFile && shippedCourse !== readFileSync(sourceCourseFile, 'utf8')) {
    throw new Error('배포 강의 JSON이 현재 원본과 다릅니다. 다시 빌드해 주세요.');
  }
  return { base: pagesBase, assets: seen.size, lessons: course.lessons.length, minutes: courseMinutes(course) };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
    const result = checkDist({
      distDir: resolve(root, 'dist'),
      sourceCourseFile: resolve(root, 'public/data/course.json'),
      base: process.env.PAGES_BASE_PATH,
    });
    console.log(`정적 배포 검사 통과: base=${result.base}, 파일 ${result.assets}개, ${result.lessons}강·${result.minutes}분`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
