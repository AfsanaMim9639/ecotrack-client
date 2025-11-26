import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Challenges from '../pages/Challenges';
import ChallengeDetails from '../pages/ChallengeDetails';
import MyActivities from '../pages/MyActivities';
import Leaderboard from '../pages/Leaderboard';
import Profile from '../pages/Profile';
import NotFound from '../pages/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/challenges" element={<Challenges />} />
      <Route path="/challenges/:id" element={<ChallengeDetails />} />
      <Route path="/leaderboard" element={<Leaderboard />} />

      {/* Protected Routes */}
      <Route
        path="/my-activities"
        element={
          <ProtectedRoute>
            <MyActivities />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;