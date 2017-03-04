import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ModalController } from 'ionic-angular';

import { DataService } from '../../providers/data/data.service';

import { QuestionsAdd } from '../questions-add/questions-add'
import { QuestionsInfo } from '../questions-info/questions-info';

import { ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

import { UserService } from '../../providers/user/user.service';

import firebase from 'firebase';

@Component({
  selector: 'page-questions',
  templateUrl: 'questions.html'
})
export class QuestionsPage {
	// For Login
	public userEmail: string;
	public userPassword: string;

	public authStatus: boolean;
	public message: string;

	private isAuth: BehaviorSubject<boolean>;

	public questionArray: any;
	
	ionViewDidLoad() {
		console.log('ionViewDidLoad QuestionsPage');
		this.user.auth.onAuthStateChanged(user => {
			this.isAuth.next(!!user);
			this.cd.detectChanges();
		});
	}

	public items = [];
	
	constructor(public navCtrl: NavController, private data: DataService, public modalCtrl: ModalController, private user:UserService, private cd:ChangeDetectorRef) {
	  
		this.isAuth = new BehaviorSubject(false);

		this.isAuth.subscribe(val => this.authStatus = val);
			
		this.data.getQuestionData().then((questions) => {

		if(questions){
			this.items = JSON.parse(questions);	
		}

		});
		
		this.showData();
	}

	showData() {
		var self = this;
		
		var user = firebase.auth().currentUser;

		if (user) {
		  // User is signed in.
		  this.userEmail = user.email;
		} else {
		  // No user is signed in.
		}

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
				
				// This is for debugging, you can remove the code if you want
				console.log("Rawlist questionText: " + snap.val().questionText);
				console.log("Rawlist firstChoice: " + snap.val().firstChoice);
				console.log("Rawlist secondChoice: " + snap.val().secondChoice);
				console.log("Rawlist thirdChoice: " + snap.val().thirdChoice);
				console.log("Rawlist fourthChoice: " + snap.val().fourthChoice);
				console.log("Rawlist correct: " + snap.val().correct);
		  });
			
			self.questionArray = rawList;
		});
	}
	
	addQuestion(){
		let addModal = this.modalCtrl.create(QuestionsAdd);

		addModal.onDidDismiss((item) => {
			if(item){
				this.storeQuestion(item);
				this.showData();
			}
		});

		addModal.present();
	}

	storeQuestion(item){
		this.items.push(item);
	}

	showQuestion(item){
		// Let's pass the item param
		this.navCtrl.push(QuestionsInfo, {
		  item: item,
		  "parentPage": this
		});
	}

	public logout() {
		this.user.logout()
		this.showData();
	}

	public login() {
		this.user.login(this.userEmail, this.userPassword)
		this.showData();
	}
}
