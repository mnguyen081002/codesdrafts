import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type {
  CategoryResponse,
  CourseResponse,
  LessonInCategoryResponse,
} from '../../api/codesmooth-api';
import type { RootState } from '../../app/store';

export interface ILessonPageNav {
  course: CourseResponse;
  categories: CategoryResponse[];
  lessons: LessonInCategoryResponse[];
  actionCount: number;
}

const initialState: ILessonPageNav = {
  actionCount: 0,
  course: {
    id: 0,
    name: '',
    summary: '',
    category: [],
    created_at: new Date(),
    deleted_at: null,
    is_published: false,
    requirements: [],
    will_learns: [],
    price: 0,
    skills: [],
    tags: [],
    target_audience: '',
    thumbnail: '',
    updated_at: new Date(),
  },
  categories: [],
  lessons: [],
};

const LessonNavSlice = createSlice({
  name: 'lessonnav',
  initialState,
  reducers: {
    incrementActionCount(state) {
      state.actionCount += 1;
    },
    setCourse(state, action: PayloadAction<CourseResponse>) {
      state.course = action.payload;
      state.categories = action.payload.category;
      let lessons: LessonInCategoryResponse[] = [];
      action.payload.category.forEach((category) => {
        lessons = lessons.concat(category.lessons);
      });
      state.lessons = lessons;
    },
    setCategories(state, action: PayloadAction<CategoryResponse[]>) {
      state.categories = action.payload;
    },
    setCategoryTitle(state, action: PayloadAction<{ id: number; title: string }>) {
      const { id, title } = action.payload;
      const copy = [...state.categories];
      const newCategories = copy.map((category) => {
        if (category.id === id) {
          category.title = title;
        }
        return category;
      });
      state.categories = newCategories;
    },
    deleteCategoryById(state, action: PayloadAction<number>) {
      state.categories = state.categories.filter((category) => category.id !== action.payload);
      state.actionCount += 1;
    },
    markLessonComplete(state, action: PayloadAction<number>) {
      const copy = [...state.categories];

      const newCategories = copy.map((category) => {
        const newLessons = category.lessons.map((lesson) => {
          if (lesson.id === action.payload) {
            lesson.isCompleted = true;
          }
          return lesson;
        });
        category.lessons = newLessons;
        return category;
      });
      state.categories = newCategories;
      state.actionCount += 1;
    },
    swapLessonOrder(state, action: PayloadAction<{ oldIndex: number; newIndex: number }>) {
      const { oldIndex, newIndex } = action.payload;
      const copy = [...state.categories];

      const temp: any = copy[oldIndex];
      copy[oldIndex] = copy[newIndex] as any;
      copy[newIndex]! = temp;

      state.categories = copy;
      state.actionCount += 1;
    },
    updateCategoryTitle(state, action: PayloadAction<{ id: number; title: string }>) {
      const { id, title } = action.payload;
      const copy = [...state.categories];

      const newCategories = copy.map((category) => {
        if (category.id === id) {
          category.title = title;
        }
        return category;
      });
      state.categories = newCategories;
    },
    // addLesson(
    //   state,
    //   action: PayloadAction<{
    //     id: number;
    //     title: string;
    //     category_id: number;
    //     index: number;
    //   }>,
    // ) {
    //   const { id, title } = action.payload;
    //   const copy = [...state.categories];

    //   copy.forEach((category) => {
    //     if (category.id === action.payload.category_id) {
    //       category?.lessons.splice(action.payload.index + 1, 0, {
    //         id,
    //         title,
    //       });
    //     }
    //   });

    //   state.categories = copy;
    // },
    // addCategory(
    //   state,
    //   action: PayloadAction<{
    //     id: number;
    //     currentCategoryId: number;
    //     title: string;
    //     lesson?: {
    //       id: number;
    //       title: string;
    //       isCompleted?: boolean;
    //     };
    //   }>,
    // ) {
    //   const { id, title, lesson } = action.payload;
    //   const copy = [...state.categories];
    //   const newCat: CategoryResponse = {
    //     id,
    //     title,
    //     lessons: [],
    //   };
    //   if (lesson) {
    //     newCat.lessons.push(lesson);
    //   }
    //   // add new category behind this one
    //   const index = copy.findIndex((category) => category.id === action.payload.currentCategoryId);
    //   copy.splice(index + 1, 0, newCat);

    //   state.categories = copy;
    //   state.actionCount += 1;
    // },
  },
});

export const {
  setCourse,
  setCategories,
  deleteCategoryById,
  markLessonComplete,
  swapLessonOrder,
  updateCategoryTitle,
  // addLesson,
  incrementActionCount,
  // addCategory,
  setCategoryTitle,
} = LessonNavSlice.actions;

export const selectCourse = (state: RootState) => state.lessonnav.course;
export const selectCategories = (state: RootState) => state.lessonnav.categories;
export const selectActionCount = (state: RootState) => state.lessonnav.actionCount;
export default LessonNavSlice.reducer;
