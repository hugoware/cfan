import { CFanApi } from '.';
import { createKey, sanitizeName, createAlias } from '../utils/naming';
import tinycolor from 'tinycolor2';

type Fail = {
	success: false;
	reason?:
		| 'already_exists'
		| 'name_too_short'
		| 'name_too_long'
		| 'hero_image_invalid'
		| 'profile_image_invalid';
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

/** attempts to create a new fandom */
export async function createFandom(
	this: CFanApi,
	name: string,
	color: string,
	profileImage: Blob,
	heroImage?: Blob
): Promise<CreateFandomResult> {
	// sanitize the name information
	name = sanitizeName(name);
	const key = createKey(name);
	const alias = createAlias(name);

	// validate the data
	if (name.length < 2) {
		return { success: false, reason: 'name_too_short' };
	}

	// if the name is too long
	if (name.length > 50) {
		return { success: false, reason: 'name_too_long' };
	}

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
		const heroImageUrl = await saveImage(this.app, 'hero', alias, heroImage);
		const profileImageUrl = await saveImage(
			this.app,
			'profile',
			alias,
			profileImage
		);

		// create the fandom data
		const style = tinycolor(color).isDark() ? 'light' : 'dark';
		const fandom = {
			alias,
			key,
			name,
			color,
			profileImageUrl,
			heroImageUrl,
			score: 0,
			createdAt: +new Date(),
			style
		};

		// save to the database
		await this.app
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
		alert(`failed create fandom: ${ex.toString()}`);
		return { success: false };
	}
}

// uploads an image
async function saveImage(
	app: firebase.app.App,
	folder: string,
	alias: string,
	image: Blob
): Promise<string | null> {
	// no image was provided
	if (!image) {
		return null;
	}

	// check image data?

	// try and upload
	const file = await app
		.storage()
		.ref(`${folder}/${alias}`)
		.put(image);

	// save the URL
	return await file.ref.getDownloadURL();
}
