import { CFanApi } from '.';
import firebase from 'firebase';

type Fail = { success: false };
type Success = { success: true };
type LoginResult = Fail | Success;

/** public user information */
export type User = {
	id: string;
	name: string;
	email: string;
};

// listeners for user state changes
let userStateChangeListeners: (() => void)[] = [];

/** prepares login handling */
export async function init(api: CFanApi, app: firebase.app.App) {
	app.auth().onAuthStateChanged((user: firebase.User) => {
		api.setUser(user);
	});
}

/** checks if the user is already logged in */
export function isUserLoggedIn(this: CFanApi) {
	return !!this.user;
}

/** attempts to sign in using Google auth */
export async function logInUsingGoogle(this: CFanApi) {
	const provider = new firebase.auth.GoogleAuthProvider();
	this.app.auth().signInWithPopup(provider);
}

/** attempts to sign in using email/password */
export async function logInUsingEmail(
	this: CFanApi,
	email: string,
	password: string
): Promise<LoginResult> {
	try {
		await this.app.auth().signInWithEmailAndPassword(email, password);

		// replace the user
		// this.setUser(result.user);

		return { success: true };
	} catch (ex) {
		console.log(`login failed: ${ex.toString()}`);
		return { success: false };
	}
}

/** listen for log in/log out events */
export function addUserStateChangeListener(listener: () => void): void {
	userStateChangeListeners.push(listener);
}

/** listen for log in/log out events */
export function removeUserStateChangeListener(listener: () => void): void {
	const index = userStateChangeListeners.indexOf(listener);
	userStateChangeListeners.splice(index, 1);
}

/** returns current user information */
export function getUser(this: CFanApi): User {
	const { user } = this;

	// no user was found
	if (!user) {
		return null;
	}

	// give back profile info
	return {
		id: user.uid,
		name: user.displayName,
		email: user.email
	};
}

/** disconnects the user */
export function clearUser(this: CFanApi) {
	this.setUser(null);
}

/** sets user information */
export function setUser(this: CFanApi, user: firebase.User | null): void {
	this.user = user;
	notifyUserStateChange();
}

// notifies all listeners that the user state change is different
function notifyUserStateChange() {
	userStateChangeListeners.forEach(listener => {
		try {
			listener();
		} catch (ex) {}
	});
}
