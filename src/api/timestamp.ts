import { CFanApi } from '.';
import firebase from 'firebase';

// document reference for timestamps
let ref: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;

// anything waiting for a timestamp update
let pending: ([(...args: any[]) => void, (...args: any[]) => void])[];

// prepare to use fimestamps
export function init(api: CFanApi, app: firebase.app.App) {
	ref = app
		.firestore()
		.collection('sessions')
		.doc('ts');

	// always clear
	pending = null;

	// after getting the snapshot, notify everyone
	ref.onSnapshot(snap => {
		// time is not requested
		if (!pending) {
			return;
		}

		// share the data
		const data = snap.data();
		const ts = data.ts.seconds as number;

		// start updating each waiting request
		for (const listener of pending) {
			const [resolve, reject] = listener;
			try {
				resolve(ts);
			} catch (ex) {
				console.log('timestamp error');
				if (reject) {
					reject(ex);
				}
			}
		}

		// clear the pending
		pending = null;
	});
}

/** request a new server timestamp */
export async function timestamp(this: CFanApi): Promise<number> {
	return new Promise((resolve, reject) => {
		// request the new timestamp
		if (!pending) {
			pending = [];

			// request the timestamp
			ref.set({ ts: firebase.firestore.FieldValue.serverTimestamp() });
		}

		// add to the waiting list
		pending.push([resolve, reject]);
	});
}
