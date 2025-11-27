export const BADGES = {
  first_challenge: {
    badgeId: 'first_challenge',
    name: 'First Step',
    description: 'Joined your first challenge',
    icon: '🌱',
    category: 'milestone'
  },
  five_challenges: {
    badgeId: 'five_challenges',
    name: 'Getting Started',
    description: 'Joined 5 challenges',
    icon: '🌿',
    category: 'milestone'
  },
  ten_challenges: {
    badgeId: 'ten_challenges',
    name: 'Eco Enthusiast',
    description: 'Joined 10 challenges',
    icon: '🌳',
    category: 'milestone'
  },
  twenty_five_challenges: {
    badgeId: 'twenty_five_challenges',
    name: 'Green Champion',
    description: 'Joined 25 challenges',
    icon: '🏆',
    category: 'milestone'
  },
  fifty_challenges: {
    badgeId: 'fifty_challenges',
    name: 'Eco Warrior',
    description: 'Joined 50 challenges',
    icon: '👑',
    category: 'milestone'
  },
  first_completion: {
    badgeId: 'first_completion',
    name: 'Finisher',
    description: 'Completed your first challenge',
    icon: '✅',
    category: 'completion'
  },
  week_streak: {
    badgeId: 'week_streak',
    name: 'Week Warrior',
    description: '7 day streak',
    icon: '🔥',
    category: 'streak'
  }
};

// Helper function to get badge details
export const getBadgeDetails = (badgeId) => {
  return BADGES[badgeId] || {
    badgeId,
    name: 'Unknown Badge',
    description: '',
    icon: '🏅'
  };
};
export const getUserBadgesWithDetails = (badgeIds) => {
  return badgeIds.map(id => getBadgeDetails(id));
}