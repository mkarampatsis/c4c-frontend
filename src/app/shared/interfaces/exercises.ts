import {TUserCategory, TUserCourse, TUserLevel} from "./user"
import { IUser } from "./user";

export interface IExercise {
    introduction: string[]
    subintroduction: string[]
    exercise_description: string[]
    category: ICategory
    hints: IHint[]
    author: IAuthor
    exercise: string
    type: string
    code: string
    output: string[]
    difficulty: string
}
  
export interface ICategory {
    chapter: string
    subchapter: ISubchapter[]
}

export interface ISubchapter {
    chapter: string
    subchapter: string[]
}

export interface IHint {
    text: string
    code: string
    penalty: string
}

export interface IAuthor {
    name: string
    email: string
}

export interface IUserTraining {
    _id: string,
    email:string,
    category: TUserCategory,
    course: TUserCourse,
    level: TUserLevel,
    answer: string,
    output: string,
    exercise: IExercise,
    user: IUser,
    rate: string
}