import * as React from 'react';
import nav, { urlParameter } from '../../navigation';

export class ShowFandomView extends React.Component {
	fandomId = urlParameter(this, 'id');

	render() {
		const id = this.fandomId();
		console.log('got it', id);
		return (
			<div className="show-fandom">
				<div>Fandom Summary</div>
				<h1>{id}</h1>
				<button onClick={nav.goToHome}>Home</button>
			</div>
		);
	}
}
