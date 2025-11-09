import React from 'react';
import { Position } from '../poker-data';
import './PositionSelector.css';

type PositionSelectorProps = {
  positions: Position[];
  selectedPosition: Position | null;
  onPositionChange: (position: Position | null) => void;
};

const PositionSelector: React.FC<PositionSelectorProps> = ({ positions, selectedPosition, onPositionChange }) => {
  return (
    <div className="position-selector">
      {positions.map((pos) => (
        <button
          key={pos}
          className={`position-btn ${selectedPosition === pos ? 'active' : ''}`}
          onClick={() => onPositionChange(pos)}
        >
          {pos}
        </button>
      ))}
      <button
        className="position-btn clear"
        onClick={() => onPositionChange(null)}
      >
        Clear
      </button>
    </div>
  );
};

export default PositionSelector;
