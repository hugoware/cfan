import { History } from 'history';

let $history: History;

export function init(history: History) {
	$history = history;
}

export function go(path: string, state?: any): void {
	$history.push(path, state);
}

export function back() {
	$history.goBack();
}

export default {
	go,
	back
};
