import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataService } from '../../providers/data/data.service';

import { ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

import { UserService } from '../../providers/user/user.service';

import firebase from 'firebase';

@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html'
})
export class QuizPage {

	@ViewChild('slides') slides: any;

	answeredFinally: boolean = false;
	
	// Our total score counter
	score: number = 0;

	questions: any;

	loggedIn: boolean;
	
	public authStatus: boolean;

	private isAuth: BehaviorSubject<boolean>;
	
	public items = [];
	
	public questionArray: any;
	
	constructor(public navCtrl: NavController, public navParams: NavParams, public data: DataService, private user:UserService, private cd:ChangeDetectorRef) {

		this.isAuth = new BehaviorSubject(false);

		this.isAuth.subscribe(val => this.authStatus = val);
		
		this.data.getQuestionData().then((questions) => {

			if(questions){
				this.items = JSON.parse(questions);	
			}
		});
		
		this.showData();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad QuizPage');
		
		this.user.auth.onAuthStateChanged(user => {
			this.isAuth.next(!!user);
			this.cd.detectChanges();
		});
	}

	showData() {
		var self = this;

		var ref = firebase.database().ref('/questions/');
		ref.once('value').then(function(snapshot) {
			// We need to create this array first to store our local data
			let rawList = [];
			snapshot.forEach( snap => {
				//if (snap.val().email == self.userEmail) {
					rawList.push({
					  id: snap.key,
					  questionText: snap.val().questionText,
					  firstChoice: snap.val().firstChoice,
					  secondChoice: snap.val().secondChoice,
					  thirdChoice: snap.val().thirdChoice,
					  fourthChoice: snap.val().fourthChoice,
					  correct: snap.val().correct
					});
				//}
				
				// This is for debugging
				console.log("Rawlist questionText: " + snap.val().questionText);
				console.log("Rawlist firstChoice: " + snap.val().firstChoice);
				console.log("Rawlist secondChoice: " + snap.val().secondChoice);
				console.log("Rawlist thirdChoice: " + snap.val().thirdChoice);
				console.log("Rawlist fourthChoice: " + snap.val().fourthChoice);
				console.log("Rawlist correct: " + snap.val().correct);
		  });
			
			self.questionArray = rawList;
			
			let order = self.questionArray;
	      	rawList = self.getRandomQuestions(order);
	      	self.questionArray = rawList;
		});
	}
	
	changeSlide(){
		this.slides.slideNext();
	}

	selectFirst: boolean;
	selectSecond: boolean;
	selectThird: boolean;
	selectFourth: boolean;
	
	checkAllFalse() {
		this.selectFirst = false;
		this.selectSecond = false;
		this.selectThird = false;
		this.selectFourth = false;
	}
	
	selectAnswer(question, selection, choice){

		if (selection == "first") {
			this.checkAllFalse();
			this.selectFirst = true;
		}
		
		else if (selection == "second") {
			this.checkAllFalse();
			this.selectSecond = true;
		}
		
		else if (selection == "third") {
			this.checkAllFalse();
			this.selectThird = true;
		}
		
		else if (selection == "fourth") {
			this.checkAllFalse();
			this.selectFourth = true;
		}
		
		this.answeredFinally = true;
		if(question.correct == choice){
			this.score++;
		}

		setTimeout(() => {
			this.answeredFinally = false;
			this.changeSlide();
			this.checkAllFalse();
		}, 1000);
	}

	getRandomQuestions(answers: any[]): any[] {

		for (let i = answers.length - 1; i > 0; i--) {
		    let j = Math.floor(Math.random() * (i + 1));
		    let temp = answers[i];
		    answers[i] = answers[j];
		    answers[j] = temp;
		}

		return answers;
	}

	restartQuiz(){
		this.score = 0;
		this.slides.slideTo(1, 1000);
		
		// In order to randomize our questions
		this.showData();
	}
}
