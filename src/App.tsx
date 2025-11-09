import { useState, useMemo } from "react";
import HandRangeGrid from "./components/HandRangeGrid";
import PositionSelector from "./components/PositionSelector";
import PlayerCountSelector from "./components/PlayerCountSelector";
import { Position, POSITIONS_BY_PLAYER_COUNT } from "./poker-data";
import "./App.css";

function App() {
	const [playerCount, setPlayerCount] = useState<number>(8);
	const [selectedPosition, setSelectedPosition] = useState<Position | null>(
		null
	);

	const handlePlayerCountChange = (count: number) => {
		setPlayerCount(count);
		setSelectedPosition(null); // Reset position when player count changes
	};

	const availablePositions = useMemo(() => {
		return POSITIONS_BY_PLAYER_COUNT[playerCount] || [];
	}, [playerCount]);

	const effectivePosition = useMemo(() => {
		if (!selectedPosition) return null;

		// Determine the effective position based on the number of players remaining to act.
		// The ranges are based on a 9-handed game, which we take as the reference.
		const referencePositions: Position[] = POSITIONS_BY_PLAYER_COUNT[9];

		const playersAfterMap: { [key: number]: Position } = {};
		referencePositions.forEach((pos, index) => {
			const playersAfter = referencePositions.length - 1 - index;
			playersAfterMap[playersAfter] = pos;
		});

		const currentPositions = POSITIONS_BY_PLAYER_COUNT[playerCount] || [];
		const selectedIndex = currentPositions.indexOf(selectedPosition);

		if (selectedIndex === -1) {
			return selectedPosition; // Fallback
		}

		const playersAfter = currentPositions.length - 1 - selectedIndex;
		return playersAfterMap[playersAfter] || selectedPosition;
	}, [playerCount, selectedPosition]);

	return (
		<div className='App'>
			<header>
				<h1>Poker Hand Range Viewer</h1>
				<p>
					Select player count and position to see its typical opening range.
				</p>
			</header>
			<main>
				<div className='selectors'>
					<PlayerCountSelector
						playerCount={playerCount}
						onPlayerCountChange={handlePlayerCountChange}
					/>
					<PositionSelector
						positions={availablePositions}
						selectedPosition={selectedPosition}
						onPositionChange={setSelectedPosition}
					/>
				</div>
				<HandRangeGrid selectedPosition={effectivePosition} />
			</main>
		</div>
	);
}

export default App;
