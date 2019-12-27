import * as React from 'react';

import * as _ from 'lodash';
import cx from 'classnames';
import api from '../../api';
import { SearchResultItem } from '../../api/search';

interface Props {
	/** When a fandom is selected from the list */
	onSelect: (alias: string) => void;
}

interface State {
	busy?: boolean;
	results?: SearchResultItem[];
	phrase?: string;
}

/** handles searching for fandoms by name */
export class Search extends React.Component<Props, State> {
	state: State = {};

	// handles user input and queues up the next search
	onInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
		this.requestSearch(event.target.value);
	};

	// handles when selecting a search result
	onSelectResult = (alias: string): void => {
		// // hide the search results
		// this.clearSearch();

		// share the selected result
		this.props.onSelect(alias);
	};

	// resets the entire form and clears the view
	clearSearch = (): void => {
		this.setState({
			busy: false,
			phrase: null,
			results: null
		});
	};

	// handles performing a search
	// debounce limits how quickly the searches take place
	requestSearch = _.debounce(async (search: string): Promise<void> => {
		// make sure there's some text
		const phrase = _.trim(search);

		// without text, clear the view
		if (!phrase) {
			this.clearSearch();
			return;
		}

		// change the state to busy so we can show a
		// loading indicator
		this.setState({
			busy: true,
			phrase
		});

		try {
			// perform the search
			const result = await api.search(search);
			this.setState({ results: result.matches });
		} catch (ex) {
			// if this failed, then need to show an error
			alert(`search failed: ${ex.toString()}`);
		} finally {
			// clear the busy state
			this.setState({ busy: false });
		}
	}, 250);

	// shows the search resuts as a list
	renderResults = () => {
		const { results } = this.state;

		// convert each item in a selectable option
		const items = _.map(results, item => (
			<div key={item.alias} onClick={() => this.onSelectResult(item.alias)}>
				{item.name}
			</div>
		));

		// display the result in a container
		return <div className="results">{items}</div>;
	};

	// shows the results as an empty set
	renderNothingFound = () => {
		const { phrase } = this.state;
		return (
			<div className="results empty">
				No results were found for <em>"{phrase}"</em>
			</div>
		);
	};

	// shows the searching indicator
	renderSearching = () => {
		return <div className="searching">Searching...</div>;
	};

	render() {
		// check the state
		const { phrase, results, busy } = this.state;
		const hasResults = _.some(results);
		const hasPhrase = _.some(phrase);
		const isBusy = !!busy;

		// create the CSS classes for this container
		const searchCx = cx('search', {
			busy: isBusy,
			'has-results': hasResults,
			'has-phrase': hasPhrase
		});

		const subview =
			// is actively searching
			isBusy
				? this.renderSearching
				: // searched but found nothing
				hasPhrase && !hasResults
				? this.renderNothingFound
				: // searched and has results
				hasPhrase && hasResults
				? this.renderResults
				: // nothing to show (default)
				  _.noop;

		// return the view
		return (
			<div className={searchCx}>
				<div className="busy" />
				<input onChange={this.onInput} />
				{subview()}
			</div>
		);
	}
}
