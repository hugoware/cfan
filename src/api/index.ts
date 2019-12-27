import { init } from './init';
import { sendBoost } from './send-boost';
import { getSummary } from './get-summary';
import { search } from './search';
import { createFandom } from './create-fandom';

export class CFanApi {
	/** internal app access */
	protected app: firebase.app.App;

	// public methods
	init = init;
	sendBoost = sendBoost;
	getSummary = getSummary;
	search = search;
	createFandom = createFandom;
}

// singleton instance
const instance = new CFanApi();
export default instance;
