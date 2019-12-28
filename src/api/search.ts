import _ from 'lodash';
import { CFanApi } from '.';

export interface SearchResultItem {
	name: string;
	alias: string;
}

type Fail = {
	success: false;
};

type Success = {
	success: true;
	matches: SearchResultItem[];
};

type SearchResult = Fail | Success;

export async function search(
	this: CFanApi,
	search: string = ''
): Promise<SearchResult> {
	// convert the search to a lowercase array of strings
	// for example, "BTS Group" would change to ["bts", "group"]
	const phrases: string[] = _(search.split(/ /gi))
		.compact()
		.map(phrase => phrase.toLowerCase())
		.value();

	try {
		// perform the database query -- each record should
		// contain a key that's a lower case array of the
		// saved name
		const snapshot = await this.app
			.firestore()
			.collection('fandoms')
			.where('key', 'array-contains-any', phrases)
			.get();

		// check if anything was found
		if (snapshot.size === 0) {
			return { success: false };
		}

		// convert the firestore document into a search result
		const matches: SearchResultItem[] = _.map(snapshot.docs, doc => {
			const data = doc.data();
			return {
				name: data.name as string,
				alias: data.alias as string
			};
		});

		// give back the matches found
		return {
			success: true,
			matches
		};
	} catch (ex) {
		// nothing was found
		return { success: false };
	}
}
