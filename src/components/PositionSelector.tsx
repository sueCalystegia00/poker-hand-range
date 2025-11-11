import React, { useRef, useEffect, useState } from "react";
import "./PositionSelector.css";

type PositionSelectorProps = {
	playerCount: number;
	buttonPosition: number | null;
	onButtonPositionChange: (position: number) => void;
};

const PositionSelector: React.FC<PositionSelectorProps> = ({
	playerCount,
	buttonPosition,
	onButtonPositionChange,
}) => {
	const tableRef = useRef<HTMLDivElement>(null);
	const [tableDimensions, setTableDimensions] = useState({
		width: 0,
		height: 0,
	});

	useEffect(() => {
		const updateDimensions = () => {
			if (tableRef.current) {
				setTableDimensions({
					width: tableRef.current.offsetWidth,
					height: tableRef.current.offsetHeight,
				});
			}
		};

		updateDimensions(); // Set initial dimensions
		window.addEventListener("resize", updateDimensions);

		return () => {
			window.removeEventListener("resize", updateDimensions);
		};
	}, [playerCount]); // Re-measure if playerCount changes, as table layout might shift

	// Player is always at the bottom seat, which we'll designate as index 0
	const mySeatIndex = 0;

	const getSeatLabel = (seatIndex: number) => {
		if (seatIndex === mySeatIndex) return "You";

		const sbSeat =
			buttonPosition !== null ? (buttonPosition + 1) % playerCount : -1;
		const bbSeat =
			buttonPosition !== null ? (buttonPosition + 2) % playerCount : -1;

		if (seatIndex === buttonPosition) return "BTN";
		if (seatIndex === sbSeat) return "SB";
		if (seatIndex === bbSeat) return "BB";

		return "";
	};

	// Calculate xRadius and yRadius dynamically based on table dimensions
	// These factors (e.g., 0.85) can be adjusted to position seats closer/further from the edge
	const seatHalfSize = 25; // Half of the seat's width/height (50px / 2)
	const margin = 5; // Small margin from the table edge

	const effectiveXRadius = Math.max(0, (tableDimensions.width / 2) - seatHalfSize - margin);
	const effectiveYRadius = Math.max(0, (tableDimensions.height / 2) - seatHalfSize - margin);

	return (
		<div className='position-selector-container'>
			<div className='poker-table' ref={tableRef}>
				<div className='table-inner'>Table</div>
				{Array.from({ length: playerCount }).map((_, index) => {
					// Arrange seats in a circle, with player 0 at the bottom center
					const angle = Math.PI + (2 * Math.PI * index) / playerCount;

					const style: React.CSSProperties = {
						// Invert Y for correct screen coordinates (Y is down)
						top: `calc(50% - ${effectiveYRadius * Math.cos(angle)}px - ${seatHalfSize}px)`,
						left: `calc(50% + ${effectiveXRadius * Math.sin(angle)}px - ${seatHalfSize}px)`,
					};

					const isMySeat = index === mySeatIndex;
					const isButtonSeat = index === buttonPosition;

					const className = `seat ${isMySeat ? "my-seat" : ""} ${
						isButtonSeat ? "button-seat" : ""
					}`;

					return (
						<button
							key={index}
							className={className}
							style={style}
							onClick={() =>
								onButtonPositionChange(buttonPosition === index ? null : index)
							}
						>
							<div className='seat-label'>{getSeatLabel(index)}</div>
						</button>
					);
				})}
			</div>
		</div>
	);
};

export default PositionSelector;