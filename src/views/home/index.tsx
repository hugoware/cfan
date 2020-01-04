import _ from 'lodash';
import * as React from 'react';
import api, { GetSummaryResult } from '../../api';
import nav from '../../navigation';
import { Fandom } from './fandom';
import { FandomSummary } from '../../api';
import { Search } from '../../components/search';
import { SearchResultItem } from '../../api/search';

interface Props {}

interface State {
	busy?: boolean;
	summary?: GetSummaryResult;
	error?: 'server_error';
}

export class HomeView extends React.Component<Props, State> {
	state: State = {};

	onCreateFandom = () => {
		nav.go('/fandom/create');
	};

	// loads summary data
	updateSummary = async () => {
		const summary = await api.getSummary();
		if (!summary.success) {
			return this.setState({ error: 'server_error' });
		}

		// set the fandoms to show
		this.setState({ summary });
	};

	// navigate the search menu
	onSelectSearchResult = (id: string) => {
		nav.goToFandom(id);
	};

	// codesandbox updates will not perform a
	// componendDidMount on refreshes
	async componentDidUpdate() {
		if (!this.state.summary && !this.state.error) {
			await this.updateSummary();
		}
	}

	async componentDidMount() {
		this.setState({ busy: true });
		await this.updateSummary();
	}

	// shows an error message
	renderError() {
		return <div className="error">{this.state.error}</div>;
	}

	// displays a list of all relevant fandoms
	renderFandoms(fandoms: FandomSummary[]) {
		const items = _.map(fandoms, fandom => (
			<Fandom key={fandom.alias} fandom={fandom} />
		));
		return <div className="fandom-list">{items}</div>;
	}

	render() {
		const { error, summary } = this.state;
		return (
			<div className="home">
				{error && this.renderError()}

				<Search onSelect={this.onSelectSearchResult} />

				<h1>Top 3</h1>
				{!error &&
					summary &&
					summary.success &&
					this.renderFandoms(summary.leaders)}

				<h2>Your Fandoms</h2>
				{!error &&
					summary &&
					summary.success &&
					this.renderFandoms(summary.member)}

				<hr />
				<hr />
				<button onClick={this.onCreateFandom}>Create Fandom</button>
				<button onClick={() => api.logOut()}>Log Out</button>
			</div>
		);
	}
}
