import { FaTrophy, FaMedal } from 'react-icons/fa';

const LeaderboardTable = ({ leaderboard, currentUserId }) => {
  const getMedalColor = (position) => {
    switch (position) {
      case 1:
        return 'text-yellow-500'; // Gold
      case 2:
        return 'text-gray-400'; // Silver
      case 3:
        return 'text-orange-600'; // Bronze
      default:
        return 'text-gray-600';
    }
  };

  const getRankBadgeColor = (rank) => {
    const colors = {
      'Legend': 'bg-purple-100 text-purple-800',
      'Master': 'bg-red-100 text-red-800',
      'Expert': 'bg-orange-100 text-orange-800',
      'Advanced': 'bg-blue-100 text-blue-800',
      'Intermediate': 'bg-green-100 text-green-800',
      'Beginner': 'bg-gray-100 text-gray-800'
    };
    return colors[rank] || colors['Beginner'];
  };

  // Handle empty leaderboard
  if (!leaderboard || leaderboard.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <p className="text-gray-500 text-lg">No users on the leaderboard yet.</p>
        <p className="text-gray-400 text-sm mt-2">Be the first to join challenges and earn points!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rank
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Level
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Points
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Challenges
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Streak
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Badges
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leaderboard.map((user) => (
              <tr
                key={user.userId}
                className={`
                  ${user.userId === currentUserId ? 'bg-green-50 border-l-4 border-green-500' : 'hover:bg-gray-50'}
                  transition-colors
                `}
              >
                {/* Rank */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {user.position <= 3 ? (
                      <FaTrophy className={`${getMedalColor(user.position)} text-2xl`} />
                    ) : (
                      <span className="text-gray-600 font-semibold text-lg">
                        #{user.position}
                      </span>
                    )}
                  </div>
                </td>

                {/* User */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      className="h-10 w-10 rounded-full"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName)}&background=22c55e&color=fff`;
                      }}
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {user.displayName}
                        {user.userId === currentUserId && (
                          <span className="ml-2 text-xs text-green-600 font-semibold">(You)</span>
                        )}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Level */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getRankBadgeColor(user.rank)}`}>
                    {user.rank}
                  </span>
                </td>

                {/* Points */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-bold text-green-600">
                    {user.totalPoints.toLocaleString()}
                  </div>
                </td>

                {/* Challenges */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {user.totalChallengesCompleted} / {user.totalChallengesJoined}
                  </div>
                </td>

                {/* Streak */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <span className="text-orange-500">🔥</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {user.currentStreak}
                    </span>
                  </div>
                </td>

                {/* Badges */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <FaMedal className="text-yellow-500" />
                    <span className="text-sm font-semibold text-gray-900">
                      {user.badgeCount}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardTable;