import _ from 'lodash';
import { CFanApi } from '.';

export async function createFandom(this: CFanApi, name: string) {
	const alias = _.snakeCase(name);
	const existing = await this.app
		.firestore()
		.collection('fandom')
		.where('alias', '==', alias)
		.get();

	console.log(existing.size);
}
