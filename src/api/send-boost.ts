import { CFanApi } from '.';
import { User } from './user';

type Success = { success: true; ts: number; score: number };
type Fail = {
	success: false;
	error: 'fandom_missing' | 'invalid_score' | 'too_soon';
};
type BoostResult = Fail | Success;

/** sends a fandom boost to the server */
export async function sendBoost(
	this: CFanApi,
	user: User,
	fandomId: string,
	boost: number
): Promise<BoostResult> {
	const fandom = await this.getSource('fandoms', fandomId);

	// this fandom wasn't real
	if (!fandom.exists) {
		return { success: false, error: 'fandom_missing' };
	}

	// get the timestamp and bump it up
	// to the next allowed boost time
	let ts = await this.timestamp();
	ts += 60 * 60; // 60 seconds x 60 minutes

	// send the boost
	// if they exist, update
	const fan = await this.getSource('fans', user.id, { source: fandom });
	if (fan.exists) {
		// make sure they haven't updated recently
		const lastBoostTime = 0 | (fan.data.ts || 0);
		console.log('compare', lastBoostTime, ts);
		if (lastBoostTime > ts) {
			return { success: false, error: 'too_soon' };
		}

		// send the update
		const current = isNaN(fan.data.score) ? 0 : fan.data.score;
		await fan.doc.update({ score: current + boost, ts });
	}
	// create the new record
	else {
		console.log('create fan');
		await fan.doc.set({ score: boost, ts, name: user.name });
	}

	// next, boost the score for the fandom
	// boost the score, but make sure to prevent
	// anything weird from happening
	let score = isNaN(fandom.data.score) ? 0 : (fandom.data.score as number);
	score = Math.max(score + boost, boost);

	// set the updated value
	await fandom.doc.update({ score, ts });

	// return the final result
	return { success: true, score, ts };
}
