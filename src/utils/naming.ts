import _ from 'lodash';

/** creates a safe version of a typed name
 * ex: Bläck Piñk --> Black Pink
 */
export function sanitizeName(str: string): string {
	return _.deburr(_.trim(str)).replace(/ +/g, ' ');
}

/** creates a search key for a name
 * ex: Black Pink --> ["black", "pink"]
 */
export function createKey(str: string): string[] {
	return sanitizeName(str).split(/ +/g);
}

/** creates an ID alias for a name
 * ex: Black Pink --> black_pink
 */
export function createAlias(str: string): string {
	return _.snakeCase(sanitizeName(str));
}

export default {
	sanitizeName,
	createKey,
	createAlias
};
