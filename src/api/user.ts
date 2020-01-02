import { CFanApi } from '.';
import firebase from 'firebase';

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
	app.auth().onAuthStateChanged(async (user: firebase.User) => {
		if (user) {
			console.log('auth changed', user.email, user.displayName);
		} else {
			console.log('user cleared');
		}
		api.setUser(user);
	});
}

/** checks if the user is already logged in */
export function isUserLoggedIn(this: CFanApi) {
	return !!this.user;
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

	console.log(firebase.auth().currentUser);

	// give back profile info
	console.log(user);
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
	if (user) {
		console.log('user set', user);
		console.log(user.displayName);
		console.log(user.photoURL);
	} else {
		console.log('user removed');
	}
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
