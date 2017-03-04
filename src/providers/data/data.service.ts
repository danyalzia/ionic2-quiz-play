import {Injectable} from '@angular/core';

import firebase from 'firebase';

import { Storage } from '@ionic/storage';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
    public db: any;
	
	data: any;
	
    constructor(public storage: Storage, public http: Http) {}

    init() {
		// You need to change the config settings for your project
		const config = {
			apiKey: "AIzaSyBB4MH_Bm2NIut795lOiPY0Zc7jeOdZyns",
			authDomain: "quiz-app-ionic.firebaseapp.com",
			databaseURL: "https://quiz-app-ionic.firebaseio.com",
			storageBucket: "quiz-app-ionic.appspot.com",
			messagingSenderId: "295696917089"
		};

		firebase.initializeApp(config);
		
		this.db = firebase.database().ref('/');
    }
	
	getQuestionData() {
		return this.storage.get('questions');  
    }
}
