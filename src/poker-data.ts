export const RANKS = [
	"A",
	"K",
	"Q",
	"J",
	"T",
	"9",
	"8",
	"7",
	"6",
	"5",
	"4",
	"3",
	"2",
] as const;
export type Rank = (typeof RANKS)[number];

const ALL_POSITIONS = [
	"UTG",
	"EP",
	"LJ",
	"HJ",
	"CO",
	"BTN",
	"SB",
	"BB",
] as const;
export type Position = (typeof ALL_POSITIONS)[number];

export const POSITIONS_BY_PLAYER_COUNT: Record<number, Position[]> = {
	9: ["UTG", "EP", "LJ", "HJ", "CO", "BTN", "SB", "BB"],
	8: ["UTG", "EP", "LJ", "HJ", "CO", "BTN", "SB", "BB"],
	7: ["UTG", "LJ", "HJ", "CO", "BTN", "SB", "BB"],
	6: ["UTG", "HJ", "CO", "BTN", "SB", "BB"],
	5: ["UTG", "CO", "BTN", "SB", "BB"],
	4: ["CO", "BTN", "SB", "BB"],
	3: ["BTN", "SB", "BB"],
	2: ["SB", "BB"],
};

const TIER_1_HANDS = ["AA", "KK", "QQ", "AKs", "AKo"];
const TIER_2_HANDS = ["JJ", "TT", "99", "AQs", "AJs", "ATs", "KQs", "AQo"];
const TIER_3_HANDS = ["88", "77", "KJs", "QJs", "JTs", "AJo", "KQo"];
const TIER_4_HANDS = [
	"66",
	"55",
	"A9s",
	"A8s",
	"A7s",
	"A6s",
	"A5s",
	"A4s",
	"A3s",
	"A2s",
	"KTs",
	"K9s",
	"QTs",
	"T9s",
	"ATo",
	"KJo",
];
const TIER_5_HANDS = [
	"44",
	"33",
	"22",
	"Q9s",
	"J9s",
	"T8s",
	"98s",
	"A9o",
	"KTo",
	"QJo",
	"JTo",
];
const TIER_6_HANDS = [
	"K8s",
	"K7s",
	"K6s",
	"K5s",
	"K4s",
	"K3s",
	"K2s",
	"Q8s",
	"Q7s",
	"Q6s",
	"J8s",
	"J7s",
	"97s",
	"87s",
	"76s",
	"65s",
	"A8o",
	"A7o",
	"K9o",
	"QTo",
	"Q9o",
	"J9o",
	"T9o",
];
const TIER_7_HANDS = [
	"Q5s",
	"Q4s",
	"Q3s",
	"Q2s",
	"J6s",
	"T7s",
	"96s",
	"86s",
	"75s",
	"64s",
	"54s",
	"A6o",
];

export type ActionType = 'openRaise' | 'call' | 'threeBet';
export type PositionActionRanges = Record<ActionType, Set<string>>;

export const ACTION_RANGES: Record<Position, PositionActionRanges> = {} as Record<Position, PositionActionRanges>;

const TIERS = [
	TIER_1_HANDS,
	TIER_2_HANDS,
	TIER_3_HANDS,
	TIER_4_HANDS,
	TIER_5_HANDS,
	TIER_6_HANDS,
	TIER_7_HANDS,
];

const POSITION_OPEN_TIER_COUNT: Record<Position, number> = {
	UTG: 2,
	EP: 3,
	LJ: 4,
	HJ: 4,
	CO: 5,
	BTN: 6,
	SB: 6,
	BB: 7,
};

ALL_POSITIONS.forEach((position) => {
	const openTierCount = POSITION_OPEN_TIER_COUNT[position];

	const openRaiseTiers = TIERS.slice(0, openTierCount);
	const callTiers = TIERS.slice(0, Math.max(0, openTierCount - 1));
	const threeBetTiers = TIERS.slice(0, Math.max(0, openTierCount - 2));

	ACTION_RANGES[position] = {
		openRaise: new Set(openRaiseTiers.flat()),
		call: new Set(callTiers.flat()),
		threeBet: new Set(threeBetTiers.flat()),
	};
});

const HAND_STRENGTHS: { [hand: string]: string } = {};
TIER_1_HANDS.forEach((hand) => (HAND_STRENGTHS[hand] = "hand-tier-1"));
TIER_2_HANDS.forEach((hand) => (HAND_STRENGTHS[hand] = "hand-tier-2"));
TIER_3_HANDS.forEach((hand) => (HAND_STRENGTHS[hand] = "hand-tier-3"));
TIER_4_HANDS.forEach((hand) => (HAND_STRENGTHS[hand] = "hand-tier-4"));
TIER_5_HANDS.forEach((hand) => (HAND_STRENGTHS[hand] = "hand-tier-5"));
TIER_6_HANDS.forEach((hand) => (HAND_STRENGTHS[hand] = "hand-tier-6"));
TIER_7_HANDS.forEach((hand) => (HAND_STRENGTHS[hand] = "hand-tier-7"));

export const getHandStrengthClass = (hand: string): string => {
	return HAND_STRENGTHS[hand] || "hand-weak";
};
