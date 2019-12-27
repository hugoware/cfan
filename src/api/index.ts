
import { init } from './init';
import { sendBoost } from './send-boost';
import { getSummary } from './get-summary';
import { search } from './search';

export class CFanApi {

  app: firebase.app.App;

  init = init
  sendBoost = sendBoost
  getSummary = getSummary
  search = search
  
}

// singleton instance
const instance = new CFanApi();
export default instance;