import _ from 'lodash';
import { History } from 'history';

let $history: History;
export function init(history: History) {
	$history = history;
}

export function goToFandom(key: string) {
	go(`/fandom/show/${key}`);
}

export function goToHome() {
	go('/home');
}

export function goToCreateFandom() {
	go('/fandom/create');
}

export function goToLogin() {
	go('/login');
}

export function go(path: string, state?: any): void {
	$history.push(path, state);
}

export function back() {
	$history.goBack();
}

export function urlParameter(
	instance: React.Component,
	name: string
): () => string {
	const props = instance.props as any;
	return () => _.get(props, `match.params.${name}`, null);
}

export default {
	go,
	back,
	goToFandom,
	goToHome,
	goToCreateFandom,
	goToLogin
};
