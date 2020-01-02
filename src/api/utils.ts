// import firebase from 'firebase';

// /** returns the current server timestamp */
// export async function timestamp(): Promise<number> {
// 	return new Promise(resolve => {
// 		console.log('get');
// 		const ts = firebase.firestore.FieldValue.serverTimestamp() as firebase.firestore.Timestamp;
// 		console.log('go', ts);
// 		const date = ts.toDate();
// 		console.log(date);
// 		resolve(+date);
// 	});
// }
