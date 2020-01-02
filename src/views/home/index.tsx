import _ from 'lodash';
import * as React from 'react';
import api from '../../api';
import nav from '../../navigation';
import { Fandom } from './fandom';
import { FandomSummary } from '../../api';

interface Props {}

interface State {
	busy?: boolean;
	fandoms?: FandomSummary[];
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
		this.setState({ fandoms: summary.member });
	};

	async componentDidMount() {
		this.setState({ busy: true });
		this.updateSummary();
	}

	// shows an error message
	renderError() {}

	// displays a list of all relevant fandoms
	renderFandoms(fandoms: FandomSummary[]) {
		const items = _.map(fandoms, fandom => (
			<Fandom key={fandom.alias} fandom={fandom} />
		));
		return <div className="fandom-list">{items}</div>;
	}

	render() {
		const { error, fandoms } = this.state;
		return (
			<div className="home">
				{error && this.renderError()}
				{!error && fandoms && this.renderFandoms(fandoms)}

				<hr />
				<hr />
				<button onClick={this.onCreateFandom}>Create Fandom</button>
				<button onClick={() => api.logOut()}>Log Out</button>
			</div>
		);
	}
}
