import React from "react";
import {
	RANKS,
	Position,
	ACTION_RANGES,
	getHandStrengthClass,
	ActionType,
} from "../poker-data";
import "./HandRangeGrid.css";

type HandRangeGridProps = {
	selectedPosition: Position | null;
};

const HandRangeGrid: React.FC<HandRangeGridProps> = ({
	selectedPosition,
}) => {
	const currentActionRanges = selectedPosition
		? ACTION_RANGES[selectedPosition]
		: null;

	const getHandAction = (hand: string): ActionType | null => {
		if (!currentActionRanges) return null;
		if (currentActionRanges.threeBet.has(hand)) return "threeBet";
		if (currentActionRanges.call.has(hand)) return "call";
		if (currentActionRanges.openRaise.has(hand)) return "openRaise";
		return null;
	};

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
						const handAction = getHandAction(hand);

						let actionClass = "";
						if (selectedPosition && handAction) {
							if (handAction === "threeBet") {
								actionClass = "hand-3bet";
							} else if (handAction === "call") {
								actionClass = "hand-call";
							} else if (handAction === "openRaise") {
								actionClass = "hand-open-raise";
							}
						}

						const isDimmed = selectedPosition && !handAction;

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
