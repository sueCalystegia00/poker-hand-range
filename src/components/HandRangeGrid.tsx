import React from 'react';
import { RANKS, Position, POSITION_RANGES, getHandStrengthClass } from '../poker-data';
import './HandRangeGrid.css';

type HandRangeGridProps = {
  selectedPosition: Position | null;
};

const HandRangeGrid: React.FC<HandRangeGridProps> = ({ selectedPosition }) => {
  const rangeToHighlight = selectedPosition ? POSITION_RANGES[selectedPosition] : null;

  return (
    <div className="hand-range-grid">
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
            const isHighlighted = rangeToHighlight?.has(hand);

            const cellClasses = [
              'hand-cell',
              strengthClass,
              isHighlighted ? 'highlight' : '',
              !rangeToHighlight || isHighlighted ? '' : 'dimmed',
            ].join(' ').trim();

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

