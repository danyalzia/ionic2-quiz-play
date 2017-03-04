import { Component, Input  } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

import firebase from 'firebase';

@Component({
  selector: 'page-questions-add',
  templateUrl: 'questions-add.html'
})
export class QuestionsAdd {
	
	question: any;
	first: any;
	second: any;
	third: any;
	fourth: any;
	
	choices: any;
	correct: any;
	
	answers: any[];
	
	constructor(public nav: NavController, public view: ViewController) {

	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad QuestionsAdd');
	}
	
	storeItem(){

	if ((this.question || this.first || this.second || this.third || this.fourth || this.choices) == null) {
			console.log("Please enter all the values");
			return;
		}
		
		let newItem = {
		  question: this.question,
		  answers: this.answers
		};

		this.view.dismiss(newItem);
		
		var self = this;
		
		var userId = firebase.auth().currentUser.uid;

		console.log(userId);
		
		var user = firebase.auth().currentUser;

		// Get a key for a new Post.
		var newPostKey = firebase.database().ref().child('questions').push().key;
		
		if (this.choices == "first") {
			this.correct = this.first;
		}
		
		else if (this.choices == "second") {
			this.correct = this.second;
		}
		
		else if (this.choices == "third") {
			this.correct = this.third;
		}
		
		else if (this.choices == "fourth") {
			this.correct = this.fourth;
		}
			
		var postData = {
			questionText: this.question,
			firstChoice: this.first,
			secondChoice: this.second,
			thirdChoice: this.third,
			fourthChoice: this.fourth,
			correct: this.correct
		};
	
		// Write the new post's data simultaneously in the posts list and the user's post list.
		var updates = {};
		updates['/questions/' + newPostKey] = postData;

		firebase.database().ref().update(updates);
	}

	close(){
		this.view.dismiss();
	}
}