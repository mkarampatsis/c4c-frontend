import { Routes } from '@angular/router';

import { registerGuard } from './guards/register.guard';
import { loggedInGuard } from './guards/loggedIn.guard';

import { LandingComponent } from './components/landing/landing.component';
import { LandingAuthoringToolComponent } from './components/landing-authoring-tool/landing-authoring-tool.component';
import { LandingLearningComponent } from './components/landing-learning/landing-learning.component';
import { LandingPlansComponent } from './components/landing-plans/landing-plans.component';
import { LandingRegisterComponent } from './components/landing-register/landing-register.component';
import { LandingLoginComponent } from './components/landing-login/landing-login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { PayformComponent } from './components/payform/payform.component';
import { EnrollComponent } from './components/enroll/enroll.component';
import { FundingComponent } from './components/funding/funding.component';

// Instructor Imports
import { AuthoringToolComponent } from './instructor/authoring-tool/authoring-tool.component';
import { InstructorDashboardComponent } from './instructor/instructor-dashboard/instructor-dashboard.component';
import { ExercisePreviewComponent } from './instructor/exercise-preview/exercise-preview.component';

// Learner Imports
import { LearnerDashboardComponent } from './learner/learner-dashboard/learner-dashboard.component';
import { LearnerPythonComponent } from './learner/learner-python/learner-python.component';
import { LearnerPythonEvaluationComponent } from './learner/learner-python-evaluation/learner-python-evaluation.component';
import { LearnerJavascriptComponent } from './learner/learner-javascript/learner-javascript.component';
import { LearnerJavascriptEvaluationComponent } from './learner/learner-javascript-evaluation/learner-javascript-evaluation.component';
import { LearnerProgressComponent } from './learner/learner-progress/learner-progress.component';
import { LearnerExerciseRateComponent } from './learner/learner-exercise-rate/learner-exercise-rate.component';

//Administrator Imports
import { AdministratorDashboardComponent } from './administrator/administrator-dashboard/administrator-dashboard.component';

// prettier-ignore
export const routes: Routes = [
  { path: 'c4c', component: LandingComponent },
  { path: 'c4c/authoring', component: LandingAuthoringToolComponent },
  { path: 'c4c/learning', component: LandingLearningComponent },
  { path: 'c4c/plans', component: LandingPlansComponent },
  { path: 'c4c/about', component:  AboutComponent},
  { path: 'c4c/contact', component:  ContactComponent},
  { path: 'c4c/login', component: LandingLoginComponent },
  { path: 'c4c/register', component: LandingRegisterComponent, canActivate: [registerGuard], },
  { path: 'c4c/dashboard', component: DashboardComponent, canActivate: [loggedInGuard], },
  { path: 'c4c/enroll', component: EnrollComponent, canActivate: [loggedInGuard], },
  { path: 'c4c/payform', component: PayformComponent, canActivate: [loggedInGuard], },
  { path: 'c4c/funding', component:  FundingComponent

  
  },
  
  // Instructors Routes
  { path: 'c4c/instructor/dashboard', component: InstructorDashboardComponent, canActivate: [loggedInGuard] },
  { path: 'c4c/authoring-tool/:course', component: AuthoringToolComponent, canActivate: [loggedInGuard] },
  { path: 'c4c/exercise/preview', component: ExercisePreviewComponent, canActivate: [loggedInGuard] },

  // learner Routes
  { path: 'c4c/learner/dashboard', component: LearnerDashboardComponent, canActivate: [loggedInGuard] },
  { path: 'c4c/learner/python/evalution', component: LearnerPythonEvaluationComponent, canActivate: [loggedInGuard] },
  { path: 'c4c/learner/python', component: LearnerPythonComponent, canActivate: [loggedInGuard] },
  { path: 'c4c/learner/javascript/evalution', component: LearnerJavascriptEvaluationComponent, canActivate: [loggedInGuard] },
  { path: 'c4c/learner/javascript', component: LearnerJavascriptComponent, canActivate: [loggedInGuard] },
  { path: 'c4c/learner/progress', component: LearnerProgressComponent, canActivate: [loggedInGuard] },
  { path: 'c4c/learner/exercise/rate', component: LearnerExerciseRateComponent, canActivate: [loggedInGuard] },
 
  // Administrator Routes
  { path: 'c4c/administrator/dashboard', component: AdministratorDashboardComponent, canActivate: [loggedInGuard] },


  { path: '', redirectTo: 'c4c', pathMatch: 'full' },
];
