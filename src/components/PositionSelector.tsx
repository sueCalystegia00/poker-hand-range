import React, { useMemo } from "react";
import { Position } from "../poker-data";
import "./PositionSelector.css";

type PositionSelectorProps = {
	positions: Position[];
	selectedPosition: Position | null;
	onPositionChange: (position: Position | null) => void;
};

// Clockwise physical layout order
const POSITION_LAYOUT_ORDER: Position[] = [
	"SB",
	"BB",
	"UTG",
	"EP",
	"LJ",
	"HJ",
	"CO",
	"BTN",
];

const PositionSelector: React.FC<PositionSelectorProps> = ({
	positions,
	selectedPosition,
	onPositionChange,
}) => {
	const sortedPositions = useMemo(() => {
		return [...positions].sort((a, b) => {
			const indexA = POSITION_LAYOUT_ORDER.indexOf(a);
			const indexB = POSITION_LAYOUT_ORDER.indexOf(b);
			return indexA - indexB;
		});
	}, [positions]);

	return (
		<div className='position-selector-container'>
			<div className='poker-table'>
				{sortedPositions.map((pos, index) => {
					const totalPositions = sortedPositions.length;

					// Calculate arc to be proportional to the number of players, leaving one space for the dealer.
					const arc = (totalPositions / (totalPositions + 1)) * 2 * Math.PI;
					// Center the arc around the bottom of the table, leaving space for the dealer at the top.
					const startAngle = Math.PI / 2 - arc / 2;

					const angle =
						totalPositions > 1
							? startAngle + (index / (totalPositions - 1)) * arc
							: Math.PI / 2;

					const xRadius = 45;
					const yRadius = 35;
					const style: React.CSSProperties = {
						top: `${50 + yRadius * Math.sin(angle)}%`,
						left: `${50 + xRadius * Math.cos(angle)}%`,
					};

					const isBtn =
						pos === "BTN" || (sortedPositions.length === 2 && pos === "BB");
					const isSelected = selectedPosition === pos;
					const className = `position-btn ${isSelected ? "active" : ""}`;

					const markerXRadius = 32;
					const markerYRadius = 22;
					const markerStyle: React.CSSProperties = {
						top: `${50 + markerYRadius * Math.sin(angle)}%`,
						left: `${50 + markerXRadius * Math.cos(angle)}%`,
					};

					return (
						<React.Fragment key={pos}>
							{isBtn && (
								<div className='btn-marker' style={markerStyle}>
									BTN
								</div>
							)}
							<button
								className={className}
								style={style}
								onClick={() => onPositionChange(selectedPosition === pos ? null : pos)}
							>
								{pos}
							</button>
						</React.Fragment>
					);
				})}
			</div>
		</div>
	);
};

export default PositionSelector;
