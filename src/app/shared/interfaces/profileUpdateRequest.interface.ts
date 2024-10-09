import { TUserCategory, TUserCourse } from './user';

export interface IProfileUpdateRequest {
  category: TUserCategory;
  course: TUserCourse
}
