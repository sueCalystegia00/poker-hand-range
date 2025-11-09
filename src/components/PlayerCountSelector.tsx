import React from "react";
import "./PlayerCountSelector.css";

type PlayerCountSelectorProps = {
	playerCount: number;
	onPlayerCountChange: (count: number) => void;
};

const PlayerCountSelector: React.FC<PlayerCountSelectorProps> = ({
	playerCount,
	onPlayerCountChange,
}) => {
	const options = [8, 7, 6, 5, 4, 3, 2];

	return (
		<div className='player-count-selector'>
			<label htmlFor='player-count'>Players:</label>
			<select
				id='player-count'
				value={playerCount}
				onChange={(e) => onPlayerCountChange(Number(e.target.value))}
			>
				{options.map((count) => (
					<option key={count} value={count}>
						{count}
					</option>
				))}
			</select>
		</div>
	);
};

export default PlayerCountSelector;
