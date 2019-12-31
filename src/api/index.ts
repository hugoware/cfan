import { createFandom } from './create-fandom';
import { findFandom } from './find-fandom';
import { getSummary } from './get-summary';
import { init } from './init';
import { search } from './search';
import { sendBoost } from './send-boost';
import {
	getUser,
	setUser,
	isUserLoggedIn,
	logInUsingEmail,
	logInUsingGoogle,
	addUserStateChangeListener,
	removeUserStateChangeListener,
	User
} from './user';

export { User } from './user';

export class CFanApi {
	/** internal app access */
	protected app: firebase.app.App;
	protected user?: firebase.User;

	// public methods
	init = init;
	sendBoost = sendBoost;
	getSummary = getSummary;
	search = search;
	createFandom = createFandom;
	findFandom = findFandom;
	logInUsingGoogle = logInUsingGoogle;
	logInUsingEmail = logInUsingEmail;
	isUserLoggedIn = isUserLoggedIn;
	getUser = getUser;
	setUser = setUser;
	addUserStateChangeListener = addUserStateChangeListener;
	removeUserStateChangeListener = removeUserStateChangeListener;
}

// singleton instance
const instance = new CFanApi();
export default instance;
