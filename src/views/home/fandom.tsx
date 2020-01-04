import * as React from 'react';
import cx from 'classnames';
import nav from '../../navigation';
import { FandomSummary } from '../../api';
import { Countdown } from '../../components/countdown';

interface Props {
	fandom: FandomSummary;
}

interface State {}

export class Fandom extends React.Component<Props, State> {
	render() {
		const { fandom } = this.props;
		const fandomCx = cx('fandom', fandom.style);
		const backgroundStyle = {
			backgroundImage: `url(${fandom.heroImageUrl})`
		};
		const backgroundColor = {
			backgroundColor: fandom.color
		};

		const percentage = {
			width: `${fandom.globalPercentage}%`
		};

		const countdown = (
			<Countdown timeRemaining={fandom.timeBeforeNextBoost}>Boost!</Countdown>
		);

		return (
			<div
				style={backgroundStyle}
				className={fandomCx}
				onClick={() => nav.goToFandom(fandom.id)}
			>
				<div className="placementoverlaybar" style={percentage} />
				<div className="overlay" style={backgroundColor} />
				<div className="info">
					<div className="name">{fandom.name}</div>
					<div className="description">{fandom.globalPercentage}</div>
					{fandom.isFan && <div className="time">{countdown}</div>}
					<div className="place">{fandom.globalPosition}</div>
					<div className="energy">{fandom.score}</div>
				</div>
			</div>
		);

		// return (
		// 	<div
		// 		className={fandomCx}
		// 		key={`fandom_${fandom.alias}`}
		// 		style={{ backgroundColor: fandom.color }}
		// 		onClick={() => nav.goToFandom(fandom.id)}
		// 	>
		// 		{fandom.heroImageUrl && (
		// 			<div
		// 				style={{ backgroundImage: `url(${fandom.heroImageUrl})` }}
		// 				className="hero"
		// 			/>
		// 		)}
		// 		<div className="detail">
		// 			<img src={fandom.profileImageUrl} alt={fandom.alias} />
		// 			<div className="title">{fandom.name}</div>
		// 			&nbsp;&nbsp;&nbsp;
		// 			<div className="score">{fandom.score}</div>
		// 		</div>
		// 	</div>
		// );
	}
}
