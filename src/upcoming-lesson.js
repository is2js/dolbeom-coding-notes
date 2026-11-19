// Keep authored backend lessons available to the editor while learner routes wait for the follow-up course.
export const UPCOMING_LESSON_ID = 'templates';
export const UPCOMING_MESSAGE = '데이터와 백엔드는 다음 강의에서 준비 중입니다.';
export const isUpcomingLesson = id => id === UPCOMING_LESSON_ID;
export const availableLessons = course => (course?.lessons || []).filter(lesson => !isUpcomingLesson(lesson.id));
