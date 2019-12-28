import { CFanApi } from '.';
import * as firebase from 'firebase';
import { init as initLogin } from './user';

type Fail = {
	success: false;
};

type Success = {
	success: true;
};

type InitResult = Fail | Success;

/** handles preparing the CFanApi */
export async function init(this: CFanApi): Promise<InitResult> {
	// Initialize Firebase
	if (!firebase.apps.length) {
		this.app = firebase.initializeApp({
			apiKey: 'AIzaSyAWbgWp8V8MSvEc9qfF_6GQNFZvj8p8vdg',
			authDomain: 'battle-of-the-fandoms.firebaseapp.com',
			databaseURL: 'https://battle-of-the-fandoms.firebaseio.com',
			projectId: 'battle-of-the-fandoms',
			storageBucket: 'battle-of-the-fandoms.appspot.com',
			messagingSenderId: '1089069989271',
			appId: '1:1089069989271:web:370d2decf05282289658d2'
		});
	} else {
		this.app = firebase.app();
	}

	// prepare the login
	initLogin(this.app);

	return { success: true };
}
