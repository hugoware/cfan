import { CFanApi } from '.';
import firebase from 'firebase';

export async function init(api: CFanApi, app: firebase.app.App) {
	app.auth().onAuthStateChanged((user: firebase.User) => {
		api.setUser(user);
		console.log('user logged in');
	});
}

type Fail = { success: false };
type Success = { success: true };
type LoginResult = Fail | Success;

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
): Promise<LoginResult> {
	try {
		const result = await this.app
			.auth()
			.signInWithEmailAndPassword(email, password);

		return { success: true };
	} catch (ex) {
		console.log(`login failed: ${ex.toString()}`);
		return { success: false };
	}
}

export function getUser(this: CFanApi): firebase.User {
	return this.user;
}

export function setUser(this: CFanApi, user: firebase.User | null): void {
	this.user = user;
}
