import { CFanApi } from '.';
import { createKey, sanitizeName, createAlias } from '../utils/naming';

type Fail = {
	success: false;
	reason?: 'already_exists';
};

type Success = {
	success: true;
	fandom: {
		name: string;
		alias: string;
		color: string;
	};
};

type CreateFandomResult = Fail | Success;

export async function createFandom(
	this: CFanApi,
	name: string,
	color: string,
	image?: Blob
): Promise<CreateFandomResult> {
	// sanitize the name information
	name = sanitizeName(name);
	const key = createKey(name);
	const alias = createAlias(name);

	try {
		// check if this alias already exists
		const existing = await this.app
			.firestore()
			.collection('fandom')
			.where('alias', '==', alias)
			.get();

		// this fandom was already found
		if (existing.size > 0) {
			return { success: false, reason: 'already_exists' };
		}

		// upload the image, if possible
		if (!!image) {
			await this.app
				.storage()
				.ref(`images/${alias}`)
				.put(image);
		}

		// create the fandom data
		const fandom = {
			alias,
			key,
			name,
			color
		};

		// save to the database
		const result = await this.app
			.firestore()
			.collection('fandoms')
			.add(fandom);

		// give back the result
		return {
			success: true,
			fandom
		};
	} catch (ex) {
		// unknown error
		return { success: false };
	}

	// this.app.storage()
	// 	.ref('/images')
	// 	.put()
}
