import React from "react";
import "./ActionLegend.css";
import { ActionType } from "../poker-data";

type ActionLegendProps = {
	visibleActions: ActionType[];
};

const ACTION_DETAILS: Record<ActionType, { label: string; className: string }> = {
	openRaise: { label: "Open Raise", className: "hand-open-raise" },
	call: { label: "Call", className: "hand-call" },
	threeBet: { label: "3Bet", className: "hand-3bet" },
};

const ActionLegend: React.FC<ActionLegendProps> = ({ visibleActions }) => {
	return (
		<div className='action-legend'>
			{visibleActions.map((action) => (
				<div key={action} className='legend-item'>
					<div
						className={`legend-color ${ACTION_DETAILS[action].className}`}
					></div>
					<span className='legend-label'>{ACTION_DETAILS[action].label}</span>
				</div>
			))}
		</div>
	);
};

export default ActionLegend;
