import * as React from 'react';
import nav, { urlParameter } from '../../navigation';
import api from '../../api';

import { Countdown } from '../../components/countdown';

export class ShowFandomView extends React.Component {
	fandomId = urlParameter(this, 'id');

	onBoost = () => {
		const id = this.fandomId();
		const user = api.getUser();
		api.sendBoost(user, id, 0 | (Math.random() * 10 + 45));
	};

	render() {
		const id = this.fandomId();
		return (
			<div className="show-fandom">
				<div>Fandom Summary</div>
				<h1>{id}</h1>

				<Countdown timeRemaining={1999} />
				<button onClick={this.onBoost}>Boost</button>
				<button onClick={nav.goToHome}>Home</button>
			</div>
		);
	}
}
