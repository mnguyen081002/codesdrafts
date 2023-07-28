export interface BaseGetCourseByIDResponse {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  name: string;
  description: string;
  short_description: string;
  price: number;
  base_price: number;
  published_at?: Date;
  target_audience: string;
  requirements: string[];
  objectives: string[];
  thumbnail: string;
  status: string;
  owner_id: number;
  feedback_email: string;
  total_enrollment: number;
  draft_course_id: null;
  categories: Category[];
  owner: Owner;
  sections: Section[];
}

export interface Section {
  id: number;
  title: string;
  type: string;
  order: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: number;
  title: string;
  order: number;
  section_id: number;
}

export interface Category {
  id: number;
  name: string;
}

export interface Owner {
  id: number;
  username: string;
  email: string;
  avatar: string;
}
