import { ComponentType } from '../shared/enum/component';
import { generateId } from './genId';

export const generateLession = (cate_id: number) => {
  return {
    id: generateId(18),
    components: [
      {
        content: {
          html: '',
        },
        type: ComponentType.Text,
      },
    ],
    summary: '',
    title: 'New Lession',
    course_category_id: cate_id,
  };
};
