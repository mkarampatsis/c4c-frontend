// export type TUserCategory = 'student' | 'teacher' | 'institution';
export type TUserCategory = 'learner' | 'instructor' | 'administrator'
export type TUserCourse = 'python' | 'javascript';
export type TUserLevel =
  | 'absolute_beginner'
  | 'beginner'
  | 'intermediate'
  | 'advanced';

export interface IUserAssessment {
  course: TUserCourse;
  level: TUserLevel;
}

export interface IUserEvaluationAnswer {
    question_id: string;
//   answerText: string;
    correct: boolean;
}

export interface IUserEvaluation {
    course: TUserCourse;
    score: number;
    level: string;
    date: Date;
    answers: IUserEvaluationAnswer[];
}

export interface IUserRoles{
    category: TUserCategory;
    course: TUserCourse;
    isEnabled: boolean;
}

export interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  name: string;
  googleId: string;
  photoUrl: string;
  provider: string;
  isAdmin: boolean;
  isEnabled: boolean;
//   category?: [TUserCategory];
  assessments?: IUserAssessment[];
  evaluations?: IUserEvaluation[];
  roles?: IUserRoles[];
}
