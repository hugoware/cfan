import _ from 'lodash';
import { CFanApi } from '.';

export interface FandomSummary {
	id: string;
	alias: string;
	name: string;
	heroImageUrl: string;
	profileImageUrl: string;
	color: string;
	score: number;
	style: string;
	globalPercentage: number;
	timeBeforeNextBoost: number;
	isFan: boolean;
}

type UserBoosts = { [id: string]: number };

interface FandomRecord {
	data: any;
	doc: firebase.firestore.QueryDocumentSnapshot<
		firebase.firestore.DocumentData
	>;
}

export interface MemberFandomSummary extends FandomSummary {
	timeRemaining: number;
}

type Fail = {
	success: false;
};

type Success = {
	success: true;
	leaders: FandomSummary[];
	member: FandomSummary[];
};

type GetSummaryResult = Fail | Success;

export async function getSummary(this: CFanApi): Promise<GetSummaryResult> {
	try {
		const now = await this.timestamp();
		const result = await this.app
			.firestore()
			.collection('fandoms')
			.orderBy('score', 'desc')
			.get();

		//  nothing was found
		if (result.size === 0) {
			return { success: false };
		}

		// get the personal boosts made by this user
		const user = this.getUser();
		const userBoosts = await this.getSource('boosts', user.id);
		const boosts = userBoosts.data as UserBoosts;

		// map the results
		const records = _.map(result.docs, doc => ({ doc, data: doc.data() }));
		const top = _.first(records);

		// gather the top three records
		const leaders = _.times(3, i =>
			createSummary(records[i], top, now, boosts)
		);
		const member = _(records)
			.filter(record => true) // console.log(record))
			.compact()
			.map(record => createSummary(record, top, now, boosts))
			.value();

		return {
			success: true,
			leaders,
			member
		};
	} catch (ex) {
		// appeared to be an error
		return { success: false };
	}
}

function createSummary(
	record: FandomRecord,
	top: FandomRecord,
	ts: number,
	boosts: UserBoosts
): FandomSummary {
	const data = Object.assign(
		{},
		{ id: record.doc.id },
		record.data
	) as FandomSummary;
	const boost = boosts[data.id];

	// add additional information
	data.globalPercentage = 100 * ((top.data.score as number) / data.score);
	data.isFan = !isNaN(boost);
	data.timeBeforeNextBoost = Math.max(0, boost - ts);

	return data;
}
