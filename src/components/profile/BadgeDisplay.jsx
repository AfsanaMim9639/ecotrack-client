import { useState } from 'react';

const BadgeDisplay = ({ badge, isEarned, earnedDate }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div
        className={`
          w-20 h-20 rounded-full flex items-center justify-center text-4xl
          ${isEarned 
            ? 'bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg scale-100' 
            : 'bg-gray-200 grayscale opacity-50 scale-90'
          }
          transition-all duration-300 hover:scale-110 cursor-pointer
        `}
      >
        {badge.icon}
      </div>
      
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-gray-900 text-white text-xs rounded-lg p-3 z-10">
          <div className="font-bold mb-1">{badge.name}</div>
          <div className="text-gray-300">{badge.description}</div>
          {isEarned && earnedDate && (
            <div className="text-gray-400 text-xs mt-2">
              Earned: {new Date(earnedDate).toLocaleDateString()}
            </div>
          )}
          {!isEarned && (
            <div className="text-yellow-400 text-xs mt-2">
              🔒 Not earned yet
            </div>
          )}
          {/* Arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
            <div className="border-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      )}
    </div>
  );
};

const BadgeGrid = ({ badges, allBadges }) => {
  // Handle case when no badges data
  if (!badges || !allBadges) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No badges to display yet. Complete challenges to earn badges!</p>
      </div>
    );
  }

  const earnedBadgeIds = new Set(badges.map(b => b.badgeId));
  
  return (
    <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
      {allBadges.map((badge) => {
        const earnedBadge = badges.find(b => b.badgeId === badge.badgeId);
        return (
          <BadgeDisplay
            key={badge.badgeId}
            badge={badge}
            isEarned={earnedBadgeIds.has(badge.badgeId)}
            earnedDate={earnedBadge?.earnedAt}
          />
        );
      })}
    </div>
  );
};

export { BadgeDisplay, BadgeGrid };
export default BadgeDisplay;