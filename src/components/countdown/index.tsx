import * as React from 'react';

interface Props {
	timeRemaining: number;
}

interface State {
	tick: number;
	time?: string;
	complete?: boolean;
}

export class Countdown extends React.Component<Props, State> {
	state: State = {
		tick: 0
	};

	// keeping track of the countdown ticker
	private _countdown: any;

	componentDidMount() {
		this._countdown = setInterval(this.onTick, 1000);
		this.onTick();
	}

	clearTicker() {
		clearInterval(this._countdown);
	}

	componentWillUnmount() {
		this.clearTicker();
	}

	// calculate the time
	onTick = () => {
		const { tick } = this.state;

		// if already finished, don't bother
		if (this.state.complete) {
			this.clearTicker();
			return;
		}

		// calculate the new time (do not go below 0)
		const remaining = Math.max(0, this.props.timeRemaining - tick);
		const minutesRemaining = Math.floor(remaining / 60);
		const secondsRemaining = remaining % 60;

		// check for single digit seconds (to add a zero or not)
		let extraZero = '';
		if (10 > secondsRemaining) {
			extraZero = '0';
		}

		// create the new time
		const time = `${minutesRemaining}:${extraZero}${secondsRemaining}`;
		const complete = remaining <= 0;

		// update the timing
		this.setState({ time, complete, tick: tick + 1 });
	};

	render() {
		const { complete } = this.state;
		return <div>{complete ? this.props.children : this.state.time}</div>;
	}
}
