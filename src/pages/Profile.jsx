import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import userService from '../services/userService';
import { BadgeGrid } from '../components/profile/BadgeDisplay';
import ShareButtons from '../components/common/ShareButtons';
import { generateShareText } from '../utils/socialShare';
import toast from 'react-hot-toast';
import { FaTrophy, FaFire, FaStar, FaChartLine } from 'react-icons/fa';

const Profile = () => {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [badgesData, setBadgesData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      fetchProfile();
      fetchBadges();
    }
  }, [currentUser]);

  const fetchProfile = async () => {
    try {
      const response = await userService.getUserProfile();
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      // If profile doesn't exist, create it
      if (error.status === 404 && currentUser) {
        try {
          const createResponse = await userService.getOrCreateProfile({
            userId: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName || currentUser.email.split('@')[0],
            photoURL: currentUser.photoURL
          });
          setProfile(createResponse.data);
        } catch (createError) {
          console.error('Error creating profile:', createError);
          toast.error('Failed to create profile');
        }
      } else {
        toast.error('Failed to load profile');
      }
    }
  };

  const fetchBadges = async () => {
    try {
      const response = await userService.getUserBadges();
      setBadgesData(response.data);
    } catch (error) {
      console.error('Error fetching badges:', error);
      // Set empty badge data if user doesn't exist
      if (error.status === 404) {
        setBadgesData({
          earnedBadges: [],
          allPossibleBadges: [],
          stats: {
            totalPoints: 0,
            totalChallengesCompleted: 0,
            totalChallengesJoined: 0,
            currentStreak: 0
          }
        });
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Profile not found</p>
      </div>
    );
  }

  const profileUrl = `${window.location.origin}/profile`;
  const shareText = generateShareText.leaderboard(profile.position || 'N/A', profile.totalPoints);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-6">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <img
              src={profile.photoURL || currentUser?.photoURL}
              alt={profile.displayName}
              className="w-32 h-32 rounded-full border-4 border-green-500"
            />

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {profile.displayName || currentUser?.displayName || 'EcoWarrior'}
              </h1>
              <p className="text-gray-600 mb-4">{currentUser?.email}</p>
              
              {/* Rank Badge */}
              <div className="inline-block bg-gradient-to-r from-green-500 to-teal-600 text-white px-4 py-2 rounded-full font-semibold mb-4">
                {profile.rank} Level
              </div>

              {/* Share Profile */}
              <div className="mt-4">
                <ShareButtons
                  text={shareText}
                  url={profileUrl}
                  title="My EcoTrack Profile"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard
            icon={<FaTrophy className="text-3xl text-yellow-500" />}
            value={profile.totalPoints}
            label="Total Points"
            color="yellow"
          />
          <StatCard
            icon={<FaChartLine className="text-3xl text-green-500" />}
            value={`${profile.totalChallengesCompleted}/${profile.totalChallengesJoined}`}
            label="Challenges"
            color="green"
          />
          <StatCard
            icon={<FaFire className="text-3xl text-orange-500" />}
            value={profile.currentStreak}
            label="Current Streak"
            color="orange"
          />
          <StatCard
            icon={<FaStar className="text-3xl text-purple-500" />}
            value={profile.badges.length}
            label="Badges Earned"
            color="purple"
          />
        </div>

        {/* Badges Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Achievements & Badges 🏆
            </h2>
            <div className="text-sm text-gray-600">
              {profile.badges.length} / {badgesData?.allPossibleBadges.length} earned
            </div>
          </div>

          {badgesData && (
            <BadgeGrid
              badges={profile.badges}
              allBadges={badgesData.allPossibleBadges}
            />
          )}
        </div>

        {/* Progress to Next Rank */}
        <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-lg shadow-lg p-6 text-white">
          <h3 className="text-xl font-bold mb-4">Your Progress</h3>
          <div className="space-y-3">
            <ProgressBar
              label="Points to Next Level"
              current={profile.totalPoints}
              target={getNextRankPoints(profile.rank)}
            />
            <ProgressBar
              label="Challenge Completion Rate"
              current={profile.totalChallengesCompleted}
              target={profile.totalChallengesJoined}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, value, label, color }) => {
  const colorClasses = {
    yellow: 'bg-yellow-50 border-yellow-200',
    green: 'bg-green-50 border-green-200',
    orange: 'bg-orange-50 border-orange-200',
    purple: 'bg-purple-50 border-purple-200'
  };

  return (
    <div className={`${colorClasses[color]} border-2 rounded-lg p-6 text-center`}>
      <div className="flex justify-center mb-3">{icon}</div>
      <div className="text-2xl font-bold text-gray-800 mb-1">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
};

const ProgressBar = ({ label, current, target }) => {
  const percentage = target > 0 ? Math.min((current / target) * 100, 100) : 0;

  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span>{label}</span>
        <span>{current} / {target}</span>
      </div>
      <div className="w-full bg-white bg-opacity-30 rounded-full h-3">
        <div
          className="bg-white h-3 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

const getNextRankPoints = (currentRank) => {
  const ranks = {
    'Beginner': 50,
    'Intermediate': 100,
    'Advanced': 250,
    'Expert': 500,
    'Master': 1000,
    'Legend': 2000
  };
  return ranks[currentRank] || 50;
};

export default Profile;