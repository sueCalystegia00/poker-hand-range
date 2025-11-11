import { useState, useMemo } from "react";
import HandRangeGrid from "./components/HandRangeGrid";
import PositionSelector from "./components/PositionSelector";
import PlayerCountSelector from "./components/PlayerCountSelector";
import ActionLegend from "./components/ActionLegend";
import {
	Position,
	POSITIONS_BY_PLAYER_COUNT,
	ActionType,
	getPlayerPosition,
} from "./poker-data";
import "./App.css";

const ALL_ACTIONS: ActionType[] = ["openRaise", "call", "threeBet"];

function App() {
	const [playerCount, setPlayerCount] = useState<number>(8);
	const [buttonPosition, setButtonPosition] = useState<number | null>(null);

	const handlePlayerCountChange = (count: number) => {
		setPlayerCount(count);
		setButtonPosition(null); // Reset button position when player count changes
	};

	const myPosition = useMemo(() => {
		if (buttonPosition === null) return null;
		return getPlayerPosition(playerCount, buttonPosition);
	}, [playerCount, buttonPosition]);

	const effectivePosition = useMemo(() => {
		if (!myPosition) return null;

		// This logic maps the calculated position to a 9-handed reference
		// to select the correct hand range data.
		const referencePositions: Position[] = POSITIONS_BY_PLAYER_COUNT[9];
		const playersAfterMap: { [key: number]: Position } = {};
		referencePositions.forEach((pos, index) => {
			const playersAfter = referencePositions.length - 1 - index;
			playersAfterMap[playersAfter] = pos;
		});

		const currentPositions = POSITIONS_BY_PLAYER_COUNT[playerCount] || [];
		const selectedIndex = currentPositions.indexOf(myPosition);

		if (selectedIndex === -1) {
			return myPosition; // Fallback
		}

		const playersAfter = currentPositions.length - 1 - selectedIndex;
		return playersAfterMap[playersAfter] || myPosition;
	}, [playerCount, myPosition]);

	return (
		<div className='App'>
			<header>
				<h1>Poker Hand Range Viewer</h1>
				<p>
					Select player count and the BTN's position to see your opening range.
				</p>
			</header>
			<main>
				<div className='selectors'>
					<PlayerCountSelector
						playerCount={playerCount}
						onPlayerCountChange={handlePlayerCountChange}
					/>
					<PositionSelector
						playerCount={playerCount}
						buttonPosition={buttonPosition}
						onButtonPositionChange={setButtonPosition}
					/>
				</div>
				<div className='hand-range'>
					<div className='legend-container'>
						{myPosition ? (
							<ActionLegend visibleActions={ALL_ACTIONS} />
						) : (
							<p className='instruction-text'>
								BTNの位置を選択してください
							</p>
						)}
					</div>
					<HandRangeGrid selectedPosition={effectivePosition} />
				</div>{" "}
				<a
					className='link'
					href='https://www.youtube.com/watch?v=7vudIk1J_g0'
					target='_blank'
				>
					※reference: ヨコサワハンドレンジ
				</a>
			</main>
		</div>
	);
}

export default App;
