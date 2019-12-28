import * as _ from 'lodash';
import { CFanApi } from '.';

type Fail = {
	success: false;
};

type Success = {
	success: true;
	name: string;
	alias: string;
};

export type FindFandomResult = Fail | Success;

export async function findFandom(
	this: CFanApi,
	alias: string
): Promise<FindFandomResult> {
	alias = _.snakeCase(alias);

	const existing = await this.app
		.firestore()
		.collection('fandoms')
		.limit(1)
		.where('alias', '==', alias)
		.get();

	// the alias wasnt found
	if (existing.size === 0) {
		return { success: false };
	}

	// return the fandom data
	const data = existing.docs[0].data();
	return {
		success: true,
		name: data.name as string,
		alias: data.alias as string
	};
}
