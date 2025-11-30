import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this import
import challengeService from '../services/challengeService'; // Add this import
import toast from 'react-hot-toast'; // Add this import
import { 
  FaLeaf, 
  FaImage, 
  FaCalendarAlt, 
  FaTrophy, 
  FaUsers,
  FaClipboardList,
  FaCheckCircle,
  FaSpinner
} from 'react-icons/fa';

const AddChallenge = () => {
  const navigate = useNavigate(); // Add this line
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    difficulty: '',
    duration: '',
    points: '',
    maxParticipants: '',
    startDate: '',
    endDate: '',
    imageUrl: '',
    requirements: ['']
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const categories = [
    'Energy Conservation',
    'Water Conservation',
    'Waste Reduction',
    'Sustainable Transport',
    'Green Living',
    'Food & Agriculture'
  ];

  const difficulties = ['Easy', 'Medium', 'Hard'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRequirementChange = (index, value) => {
    const newRequirements = [...formData.requirements];
    newRequirements[index] = value;
    setFormData({
      ...formData,
      requirements: newRequirements
    });
  };

  const addRequirement = () => {
    setFormData({
      ...formData,
      requirements: [...formData.requirements, '']
    });
  };

  const removeRequirement = (index) => {
    const newRequirements = formData.requirements.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      requirements: newRequirements
    });
  };

  // REPLACE THIS ENTIRE FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title || !formData.description || !formData.category || !formData.difficulty) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!formData.duration || parseInt(formData.duration) < 1) {
      toast.error('Duration must be at least 1 day');
      return;
    }

    setLoading(true);
    try {
      // Filter out empty requirements
      const filteredRequirements = formData.requirements.filter(req => req.trim() !== '');
      
      // Prepare data for API
      const challengeData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        difficulty: formData.difficulty,
        duration: parseInt(formData.duration),
        points: formData.points ? parseInt(formData.points) : undefined,
        maxParticipants: formData.maxParticipants ? parseInt(formData.maxParticipants) : undefined,
        startDate: formData.startDate || undefined,
        endDate: formData.endDate || undefined,
        imageUrl: formData.imageUrl || undefined,
        requirements: filteredRequirements.length > 0 ? filteredRequirements : undefined
      };

      // Remove undefined values
      Object.keys(challengeData).forEach(key => 
        challengeData[key] === undefined && delete challengeData[key]
      );

      console.log('📤 Sending challenge data:', challengeData);

      const response = await challengeService.createChallenge(challengeData);
      
      console.log('✅ Challenge created:', response);
      toast.success('Challenge created successfully! 🎉');
      setSuccess(true);
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/challenges');
      }, 2000);
      
    } catch (error) {
      console.error('❌ Error creating challenge:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to create challenge';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  
  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-12 text-center max-w-md">
          <div className="mb-6">
            <FaCheckCircle className="text-7xl text-green-500 mx-auto animate-bounce" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Challenge Created! 🎉
          </h2>
          <p className="text-gray-600 mb-6">
            Your challenge has been successfully added and is now live!
          </p>
          <a
            href="/challenges"
            className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all"
          >
            View All Challenges
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-full shadow-lg">
              <FaLeaf className="text-4xl text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Create New Challenge
          </h1>
          <p className="text-gray-600">
            Add a new eco-challenge for the community to join
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Challenge Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                placeholder="e.g., Plant 100 Trees in Your Community"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none"
                placeholder="Describe the challenge, its goals, and impact..."
                required
              />
            </div>

            {/* Category & Difficulty */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Difficulty *
                </label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  required
                >
                  <option value="">Select difficulty</option>
                  {difficulties.map((diff) => (
                    <option key={diff} value={diff}>{diff}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Duration & Points */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Duration (days)
                </label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  placeholder="e.g., 30"
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Points Reward
                </label>
                <div className="relative">
                  <FaTrophy className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500" />
                  <input
                    type="number"
                    name="points"
                    value={formData.points}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    placeholder="e.g., 100"
                    min="0"
                  />
                </div>
              </div>
            </div>

            {/* Start Date & End Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Start Date
                </label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  End Date
                </label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Max Participants */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Max Participants
              </label>
              <div className="relative">
                <FaUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  name="maxParticipants"
                  value={formData.maxParticipants}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  placeholder="e.g., 100 (leave empty for unlimited)"
                  min="1"
                />
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Challenge Image URL
              </label>
              <div className="relative">
                <FaImage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            {/* Requirements */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Challenge Requirements
              </label>
              <div className="space-y-3">
                {formData.requirements.map((req, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="relative flex-1">
                      <FaClipboardList className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={req}
                        onChange={(e) => handleRequirementChange(index, e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                        placeholder={`Requirement ${index + 1}`}
                      />
                    </div>
                    {formData.requirements.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeRequirement(index)}
                        className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors font-medium"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addRequirement}
                  className="text-green-600 hover:text-green-700 font-medium text-sm"
                >
                  + Add Another Requirement
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-gray-200">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-lg font-semibold text-lg hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    <span>Creating Challenge...</span>
                  </>
                ) : (
                  <>
                    <FaLeaf />
                    <span>Create Challenge</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <a
            href="/challenges"
            className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            ← Back to Challenges
          </a>
        </div>
      </div>
    </div>
  );
};

export default AddChallenge;