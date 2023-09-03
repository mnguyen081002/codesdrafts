import { LessonComponentType } from '@/shared/enum/component';

import { generateId } from './genId';

export const generateLesson = (cate_id: number) => {
  return {
    id: generateId(18),
    components: [
      {
        content: {
          html: '',
        },
        type: LessonComponentType.Text,
      },
    ],
    summary: '',
    title: 'New Lesson',
    course_category_id: cate_id,
  };
};
