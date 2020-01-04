import { createFandom } from './create-fandom';
import { findFandom } from './find-fandom';
import { getSummary } from './get-summary';
import { init } from './init';
import { search } from './search';
import { sendBoost } from './send-boost';
import { logInUsingEmail, logInUsingGoogle, logOut } from './login';
import { timestamp } from './timestamp';
import {
	getUser,
	setUser,
	isUserLoggedIn,
	addUserStateChangeListener,
	removeUserStateChangeListener
} from './user';

export { User } from './user';
export { GetSummaryResult, FandomSummary } from './get-summary';

interface DataSource {
	exists: boolean;
	data?: any;
	source: firebase.firestore.CollectionReference<
		firebase.firestore.DocumentData
	>;
	doc: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;
	snapshot: firebase.firestore.DocumentSnapshot<
		firebase.firestore.DocumentData
	>;
}

interface GetSourceOptions {
	source?: DataSource;
}

export class CFanApi {
	/** internal app access */
	protected app: firebase.app.App;
	protected user?: firebase.User;

	/** finds references and document data */
	protected async getSource(
		collectionName: string,
		documentName: string,
		options: GetSourceOptions = {}
	): Promise<DataSource> {
		const source = options.source
			? options.source.doc.collection(collectionName)
			: this.app.firestore().collection(collectionName);

		const doc = source.doc(documentName);
		const snapshot = await doc.get();
		const { exists } = snapshot;

		return {
			source,
			doc,
			snapshot,
			exists: exists,
			data: exists ? snapshot.data() : null
		};
	}

	// public methods
	init = init;
	sendBoost = sendBoost;
	getSummary = getSummary;
	search = search;
	createFandom = createFandom;
	findFandom = findFandom;
	logInUsingGoogle = logInUsingGoogle;
	logInUsingEmail = logInUsingEmail;
	logOut = logOut;
	isUserLoggedIn = isUserLoggedIn;
	getUser = getUser;
	setUser = setUser;
	addUserStateChangeListener = addUserStateChangeListener;
	removeUserStateChangeListener = removeUserStateChangeListener;
	timestamp = timestamp;
}

// singleton instance
const instance = new CFanApi();
export default instance;
