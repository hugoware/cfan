import _ from 'lodash';
import * as React from 'react';
import api from '../../api';
import nav from '../../navigation';
import cx from 'classnames';
import { FandomSummary } from '../../api/get-summary';

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

	async componentDidMount() {
		this.setState({ busy: true });

		// try and load the summary
		const summary = await api.getSummary();
		if (!summary.success) {
			return this.setState({ error: 'server_error' });
		}

		// set the fandoms to show
		this.setState({ fandoms: summary.member });
	}

	// shows an error message
	renderError() {}

	// displays a list of all relevant fandoms
	renderFandoms(fandoms: FandomSummary[]) {
		const items = _.map(fandoms, fandom => {
			const fandomCx = cx('fandom', fandom.style);

			return (
				<div
					className={fandomCx}
					key={`fandom_${fandom.alias}`}
					style={{ backgroundColor: fandom.color }}
				>
					{fandom.heroImageUrl && (
						<div
							style={{ backgroundImage: `url(${fandom.heroImageUrl})` }}
							className="hero"
						/>
					)}
					<div className="detail">
						<img src={fandom.profileImageUrl} alt={fandom.alias} />
						<div className="title">{fandom.name}</div>
					</div>
				</div>
			);
		});

		return <div className="fandom-list">{items}</div>;
	}

	render() {
		const { error, fandoms } = this.state;
		return (
			<div className="home">
				{error && this.renderError()}
				{!error && fandoms && this.renderFandoms(fandoms)}

				<button onClick={this.onCreateFandom}>Create Fandom</button>
			</div>
		);
	}
}
