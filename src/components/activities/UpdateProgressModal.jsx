// components/activities/UpdateProgressModal.jsx
import { useState } from 'react';
import { FaTimes, FaSave } from 'react-icons/fa';

const UpdateProgressModal = ({ activity, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    progressPercentage: activity.progressPercentage || 0,
    notes: '',
    impactValue: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800">Update Progress</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <FaTimes size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Progress Percentage */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Progress ({formData.progressPercentage}%)
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={formData.progressPercentage}
              onChange={(e) => setFormData({ ...formData, progressPercentage: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Impact Value */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Impact Value (optional)
            </label>
            <input
              type="number"
              value={formData.impactValue}
              onChange={(e) => setFormData({ ...formData, impactValue: e.target.value })}
              placeholder="e.g., 5 (kg, kWh, etc.)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              How much impact did you make? (e.g., kg of waste reduced)
            </p>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Notes (optional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="What did you accomplish today?"
              rows="3"
              maxLength="500"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            />
            <p className="text-xs text-gray-500 mt-1 text-right">
              {formData.notes.length}/500
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2"
          >
            <FaSave />
            Save Progress
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProgressModal;