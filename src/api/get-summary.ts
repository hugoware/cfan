import * as _ from 'lodash';
import { CFanApi } from '.';

export interface FandomSummary {
	alias: string;
	name: string;
	heroImageUrl: string;
	profileImageUrl: string;
	color: string;
	score: number;
	style: string;
}

export interface MemberFandomSummary extends FandomSummary {
	timeRemaining: number;
}

type Fail = {
	success: false;
};

type Success = {
	success: true;
	top: FandomSummary[];
	ahead: FandomSummary[];
	member: FandomSummary[];
	tail: FandomSummary[];
};

type GetSummaryResult = Fail | Success;

export async function getSummary(this: CFanApi): Promise<GetSummaryResult> {
	try {
		const result = await this.app
			.firestore()
			.collection('fandoms')
			.get();

		//  nothing was found
		if (result.size === 0) {
			return { success: false };
		}

		// map the results
		const records = _.map(result.docs, doc => {
			const data = doc.data();
			return Object.assign({}, data) as FandomSummary;
		});

		return {
			success: true,
			top: _.take(records, 3),
			ahead: _.take(records, 2),
			tail: _.take(records, 2),
			member: records
		};
	} catch (ex) {
		// appeared to be an error
		return { success: false };
	}
}
