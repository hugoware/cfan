import _ from 'lodash';
import { CFanApi } from '.';
import { getPlace } from '../utils/numbering';

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
	globalPosition: number;
	timeBeforeNextBoost: number;
	isFan: boolean;
}

type UserBoosts = { [id: string]: number };

interface FandomRecord {
	id: string;
	data: any;
	doc: firebase.firestore.QueryDocumentSnapshot<
		firebase.firestore.DocumentData
	>;
}

type Fail = {
	success: false;
};

type Success = {
	success: true;
	leaders: FandomSummary[];
	member: FandomSummary[];
};

export type GetSummaryResult = Fail | Success;

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
		const boosts = (userBoosts.data || {}) as UserBoosts;

		// map the results
		const records = _.map(result.docs, doc => ({
			id: doc.id,
			doc,
			data: doc.data()
		}));
		const top = _.first(records);
		const leads = records.slice(0, 3);

		// gather the top three records
		const leaders = _.times(3, i =>
			createSummary(records[i], top, i, now, boosts)
		);

		let place = 0;
		const member = _(records)
			.map(record => ({ place: ++place, record }))
			.filter(item => {
				const { id } = item.record;
				const isMember = !isNaN(boosts[id]);
				const isTop = _.find(leads, { id });
				return isMember && !isTop;
			})
			.map(item => createSummary(item.record, top, item.place, now, boosts))
			.value();

		return {
			success: true,
			leaders,
			member
		};
	} catch (ex) {
		// appeared to be an error
		alert(`failed to get summary: ${ex.toString()}`);
		return { success: false };
	}
}

function createSummary(
	record: FandomRecord,
	top: FandomRecord,
	place: number,
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
	data.globalPercentage = 100 - 100 * (data.score / (top.data.score as number));
	data.globalPosition = getPlace(place + 1);
	data.isFan = !isNaN(boost);
	data.timeBeforeNextBoost = Math.max(0, boost - ts);

	return data;
}
