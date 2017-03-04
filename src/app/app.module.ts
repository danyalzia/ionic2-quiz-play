import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { QuizPage } from '../pages/quiz/quiz';
import { DataService } from '../providers/data/data.service';

import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';

import { AuthService } from "./auth.service";

import {
  ReactiveFormsModule
} from '@angular/forms';

import { AuthGuard } from "./auth.guard";

import { UserService } from '../providers/user/user.service';

import { Storage } from '@ionic/storage';

import { QuestionsAdd } from '../pages/questions-add/questions-add'
import { QuestionsInfo } from '../pages/questions-info/questions-info';
import { QuestionsPage } from '../pages/questions/questions';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
	QuizPage,
	SigninPage,
	SignupPage,
	QuestionsAdd,
    QuestionsInfo,
	QuestionsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
	ReactiveFormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
	QuizPage,
	SigninPage,
	SignupPage,
	QuestionsAdd,
    QuestionsInfo,
	QuestionsPage
  ],
  providers: [Storage, DataService, UserService, AuthService, AuthGuard, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
