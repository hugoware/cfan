import { CFanApi } from '.';
import firebase from 'firebase';

export async function init(app: firebase.app.App) {
	app.auth().onAuthStateChanged(state => {
		console.log('state', state);
	});

	// const result = await app.auth().getRedirectResult();
	// console.log(result);
}

/** checks if the user is already logged in */
export function isLoggedIn(this: CFanApi) {}

/** attempts to sign in using Google auth */
export async function logInUsingGoogle(this: CFanApi) {
	const provider = new firebase.auth.GoogleAuthProvider();
	// this.app.auth().signInWithRedirect(provider);
	this.app.auth().signInWithPopup(provider);
}

/** attempts to sign in using email/password */
export async function logInUsingEmail(
	this: CFanApi,
	email: string,
	password: string
) {
	const result = await this.app
		.auth()
		.signInWithEmailAndPassword(email, password);

	console.log(result);
}

export function getUser(this: CFanApi) {}
