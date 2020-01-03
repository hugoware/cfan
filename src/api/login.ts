import { CFanApi } from '.';
import firebase from 'firebase';

type Fail = { success: false };
type Success = { success: true };
type LoginResult = Fail | Success;

/** attempts to sign in using Google auth */
export async function logInUsingGoogle(this: CFanApi) {
	const provider = new firebase.auth.GoogleAuthProvider();
	provider.addScope('https://www.googleapis.com/auth/userinfo.profile');

	const result = await this.app.auth().signInWithPopup(provider);
	if (result.user) {
		this.setUser(result.user);
	}
	// this.app.auth().signInWithRedirect(provider);
}

/** attempts to sign out */
export async function logOut(): Promise<void> {
	return this.app.auth().signOut();
}

/** attempts to sign in using email/password */
export async function logInUsingEmail(
	this: CFanApi,
	email: string,
	password: string
): Promise<LoginResult> {
	try {
		// this.app.auth().
		// provider.addScope('https://www.googleapis.com/auth/userinfo.profile');

		await this.app.auth().signInWithEmailAndPassword(email, password);

		// replace the user
		// this.setUser(result.user);

		return { success: true };
	} catch (ex) {
		console.log(`login failed: ${ex.toString()}`);
		return { success: false };
	}
}
