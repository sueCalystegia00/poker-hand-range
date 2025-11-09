export const RANKS = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'] as const;
export type Rank = typeof RANKS[number];

// New position list as requested, with BTN and BB added.
export const ALL_POSITIONS = ['UTG', 'EP', 'LJ', 'HJ', 'CO', 'BTN', 'SB', 'BB'] as const;
export type Position = typeof ALL_POSITIONS[number];

// Mapping of player count to the available positions for selection
export const POSITIONS_BY_PLAYER_COUNT: Record<number, Position[]> = {
  9: ['UTG', 'EP', 'LJ', 'HJ', 'CO', 'BTN', 'SB', 'BB'],
  8: ['UTG', 'EP', 'LJ', 'HJ', 'CO', 'BTN', 'SB', 'BB'],
  7: ['UTG', 'LJ', 'HJ', 'CO', 'BTN', 'SB', 'BB'],
  6: ['LJ', 'HJ', 'CO', 'BTN', 'SB', 'BB'],
  5: ['HJ', 'CO', 'BTN', 'SB', 'BB'],
  4: ['CO', 'BTN', 'SB', 'BB'],
  3: ['BTN', 'SB', 'BB'],
  2: ['BTN', 'BB'], // Heads-up
};

// New ranges corresponding to the new position names.
// These are simplified and illustrative. BB range is a sample "defend" range.
const RANGES: Record<Position, string[]> = {
  // Full-Ring positions
  UTG: [ // Tightest
    'AA', 'KK', 'QQ', 'JJ', 'TT', '99',
    'AKs', 'AQs', 'AJs', 'ATs',
    'KQs', 'KJs',
    'AKo', 'AQo',
  ],
  EP: [ // Early Position, slightly wider than UTG
    'AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88',
    'AKs', 'AQs', 'AJs', 'ATs', 'A9s',
    'KQs', 'KJs', 'KTs',
    'QJs',
    'AKo', 'AQo', 'AJo',
  ],
  LJ: [ // Lowjack, often UTG in 6-max
    'AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77',
    'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s',
    'KQs', 'KJs', 'KTs', 'K9s',
    'QJs', 'QTs', 'JTs', 'T9s',
    'AKo', 'AQo', 'AJo', 'KQo',
  ],
  HJ: [ // Highjack
    'AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55',
    'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s',
    'KQs', 'KJs', 'KTs', 'K9s',
    'QJs', 'QTs', 'JTs', 'T9s', '98s',
    'AKo', 'AQo', 'AJo', 'ATo', 'KQo', 'KJo',
  ],
  CO: [
    'AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55', '44',
    'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s',
    'KQs', 'KJs', 'KTs', 'K9s', 'K8s',
    'QJs', 'QTs', 'Q9s', 'JTs', 'J9s', 'T9s', '98s', '87s',
    'AKo', 'AQo', 'AJo', 'ATo', 'A9o', 'KQo', 'KJo', 'KTo', 'QJo', 'QTo',
  ],
  BTN: [
    'AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55', '44', '33', '22',
    'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s',
    'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s', 'K6s', 'K5s', 'K4s', 'K3s', 'K2s',
    'QJs', 'QTs', 'Q9s', 'Q8s', 'Q7s', 'Q6s',
    'JTs', 'J9s', 'J8s', 'J7s',
    'T9s', 'T8s', 'T7s',
    '98s', '97s', '87s', '86s', '76s', '75s', '65s', '54s',
    'AKo', 'AQo', 'AJo', 'ATo', 'A9o', 'A8o', 'A7o', 'A6o', 'A5o', 'A4o',
    'KQo', 'KJo', 'KTo', 'K9o', 'QJo', 'QTo', 'Q9o', 'JTo', 'J9o', 'T9o',
  ],
  SB: [
    'AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55',
    'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s',
    'KQs', 'KJs', 'KTs', 'K9s',
    'QJs', 'QTs', 'JTs', 'T9s',
    'AKo', 'AQo', 'AJo', 'ATo', 'KQo',
  ],
  BB: [ // Example BB defend range vs BTN open
    'AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55', '44', '33', '22',
    'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s',
    'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s', 'K6s',
    'QJs', 'QTs', 'Q9s', 'Q8s',
    'JTs', 'J9s', 'J8s',
    'T9s', 'T8s', '98s', '87s', '76s', '65s',
    'AKo', 'AQo', 'AJo', 'ATo', 'A9o',
    'KQo', 'KJo', 'KTo', 'QJo', 'QTo', 'JTo',
  ],
};

export const POSITION_RANGES: Record<Position, Set<string>> = Object.entries(RANGES).reduce((acc, [pos, hands]) => {
  acc[pos as Position] = new Set(hands);
  return acc;
}, {} as Record<Position, Set<string>>);

// Hand strength classes remain the same
const PREMIUM_HANDS = new Set(['AA', 'KK', 'QQ', 'JJ', 'AKs']);
const STRONG_HANDS = new Set(['TT', '99', 'AQs', 'AJs', 'KQs', 'AKo']);
const PLAYABLE_HANDS = new Set(['88', '77', '66', 'ATs', 'KJs', 'QJs', 'JTs', 'T9s', 'AQo', 'AJo', 'KQo']);
const MARGINAL_HANDS = new Set(['55', '44', '33', '22', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s', 'KTs', 'K9s', 'QTs', 'Q9s', 'J9s', '98s', '87s', '76s', 'ATo', 'A9o', 'KJo', 'KTo', 'QJo']);

export const getHandStrengthClass = (hand: string): string => {
  if (PREMIUM_HANDS.has(hand)) return 'hand-premium';
  if (STRONG_HANDS.has(hand)) return 'hand-strong';
  if (PLAYABLE_HANDS.has(hand)) return 'hand-playable';
  if (MARGINAL_HANDS.has(hand)) return 'hand-marginal';
  return 'hand-weak';
};
