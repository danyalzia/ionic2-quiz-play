import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import firebase from 'firebase';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-questions-info',
  templateUrl: 'questions-info.html'
})
export class QuestionsInfo {
  question;
  firstChoice;
  secondChoice;
  thirdChoice;
  fourthChoice;
  correct;
  id;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
	console.log('ionViewDidLoad QuestionsInfo');
	this.question = this.navParams.get('item').questionText;
    this.firstChoice = this.navParams.get('item').firstChoice;
	this.secondChoice = this.navParams.get('item').secondChoice;
	this.thirdChoice = this.navParams.get('item').thirdChoice;
	this.fourthChoice = this.navParams.get('item').fourthChoice;
	this.correct = this.navParams.get('item').correct;
	this.id = this.navParams.get('item').id;
  }
  
  delete() {
	var userId = firebase.auth().currentUser.uid;
	  
	firebase.database().ref('questions/' + this.id).set({
		questionText: null,
		firstChoice: null
	});
	
	this.navParams.get('parentPage').showData()
	
	this.navCtrl.pop();
  }
}