import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import Challenges from '../pages/Challenges';
import ChallengeDetails from '../pages/ChallengeDetails';
import AddChallenge from '../pages/AddChallenge';
import JoinChallenge from '../pages/JoinChallenge';
import MyActivities from '../pages/MyActivities';
import ActivityDetail from '../pages/ActivityDetail';
import Leaderboard from '../pages/Leaderboard'; // ✅ NEW
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Help from '../pages/Help';
import PrivacyTerms from '../pages/PrivacyTerms';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/challenges" element={<Challenges />} />
      <Route path="/challenges/:id" element={<ChallengeDetails />} />
      <Route path="/leaderboard" element={<Leaderboard />} /> {/* ✅ NEW */}
      <Route path="/profile" element={<Profile />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/help" element={<Help />} />
      <Route path="/privacy" element={<PrivacyTerms />} />
      {/* Protected Routes */}
      <Route
        path="/challenges/add"
        element={
          <ProtectedRoute>
            <AddChallenge />
          </ProtectedRoute>
        }
      />
      <Route
        path="/challenges/join/:id"
        element={
          <ProtectedRoute>
            <JoinChallenge />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-activities"
        element={
          <ProtectedRoute>
            <MyActivities />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-activities/:id"
        element={
          <ProtectedRoute>
            <ActivityDetail />
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;