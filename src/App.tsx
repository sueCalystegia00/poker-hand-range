import { useState, useMemo } from 'react';
import HandRangeGrid from './components/HandRangeGrid';
import PositionSelector from './components/PositionSelector';
import PlayerCountSelector from './components/PlayerCountSelector';
import { Position, POSITIONS_BY_PLAYER_COUNT } from './poker-data';
import './App.css';

function App() {
  const [playerCount, setPlayerCount] = useState<number>(9);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);

  const handlePlayerCountChange = (count: number) => {
    setPlayerCount(count);
    setSelectedPosition(null); // Reset position when player count changes
  };

  const availablePositions = useMemo(() => {
    return POSITIONS_BY_PLAYER_COUNT[playerCount] || [];
  }, [playerCount]);

  return (
    <div className="App">
      <header>
        <h1>Poker Hand Range Viewer</h1>
        <p>Select player count and position to see its typical opening range.</p>
      </header>
      <main>
        <div className="selectors">
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
        <HandRangeGrid selectedPosition={selectedPosition} />
      </main>
    </div>
  );
}

export default App;
