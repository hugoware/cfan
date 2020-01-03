import * as React from 'react';
import nav, { urlParameter } from '../../navigation';
import api from '../../api';

export class ShowFandomView extends React.Component {
	fandomId = urlParameter(this, 'id');

	onBoost = () => {
		const id = this.fandomId();
		const user = api.getUser();
		api.sendBoost(user, id, 0 | (Math.random() * 10 + 45));
	};

	render() {
		const id = this.fandomId();
		console.log('got it', id);
		return (
			<div className="show-fandom">
				<div>Fandom Summary</div>
				<h1>{id}</h1>
				<button onClick={this.onBoost}>Boost</button>
				<button onClick={nav.goToHome}>Home</button>
			</div>
		);
	}
}
