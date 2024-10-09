export interface IUserLanguageEvaluation {
  id: number
  question: string
  answers: [ 
    {
      text: string,
      correct: boolean
    }
  ]
  course: string
  level: string
  gravity: number
}