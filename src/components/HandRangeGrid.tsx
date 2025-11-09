import React from "react";
import {
	RANKS,
	Position,
	ACTION_RANGES,
	getHandStrengthClass,
} from "../poker-data";
import "./HandRangeGrid.css";

type HandRangeGridProps = {
	selectedPosition: Position | null;
};

const HandRangeGrid: React.FC<HandRangeGridProps> = ({ selectedPosition }) => {
	const currentActionRanges = selectedPosition
		? ACTION_RANGES[selectedPosition]
		: null;

	return (
		<div className='hand-range-grid'>
			{RANKS.map((rank1, i) => (
				<React.Fragment key={rank1}>
					{RANKS.map((rank2, j) => {
						let hand: string;
						if (i < j) {
							hand = `${rank1}${rank2}s`; // Suited
						} else if (j < i) {
							hand = `${rank2}${rank1}o`; // Off-suited
						} else {
							hand = `${rank1}${rank2}`; // Pair
						}

						const strengthClass = getHandStrengthClass(hand);

						let actionClass = "";
						if (selectedPosition && currentActionRanges) {
							if (currentActionRanges.threeBet.has(hand)) {
								actionClass = "hand-3bet";
							} else if (currentActionRanges.call.has(hand)) {
								actionClass = "hand-call";
							} else if (currentActionRanges.openRaise.has(hand)) {
								actionClass = "hand-open-raise";
							}
						}

						const isDimmed =
							selectedPosition && !currentActionRanges?.openRaise.has(hand);

						const cellClasses = [
							"hand-cell",
							strengthClass,
							actionClass,
							isDimmed ? "dimmed" : "",
						]
							.join(" ")
							.trim();

						return (
							<div key={hand} className={cellClasses}>
								{hand}
							</div>
						);
					})}
				</React.Fragment>
			))}
		</div>
	);
};

export default HandRangeGrid;
