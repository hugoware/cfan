import { createFandom } from './create-fandom';
import { findFandom } from './find-fandom';
import { getSummary } from './get-summary';
import { init } from './init';
import { search } from './search';
import { sendBoost } from './send-boost';
import { getUser, isLoggedIn, logInUsingEmail, logInUsingGoogle } from './user';

export class CFanApi {
	/** internal app access */
	protected app: firebase.app.App;

	// public methods
	init = init;
	sendBoost = sendBoost;
	getSummary = getSummary;
	search = search;
	createFandom = createFandom;
	findFandom = findFandom;
	logInUsingGoogle = logInUsingGoogle;
	logInUsingEmail = logInUsingEmail;
	isLoggedIn = isLoggedIn;
	getUser = getUser;
}

// singleton instance
const instance = new CFanApi();
export default instance;
