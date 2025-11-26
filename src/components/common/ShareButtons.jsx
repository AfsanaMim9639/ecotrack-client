import { FaTwitter, FaFacebook, FaLinkedin, FaWhatsapp, FaLink } from 'react-icons/fa';
import toast from 'react-hot-toast';
import {
  shareOnTwitter,
  shareOnFacebook,
  shareOnLinkedIn,
  shareOnWhatsApp,
  copyToClipboard
} from '../../utils/socialShare';

const ShareButtons = ({ text, url, title }) => {
  const handleCopyLink = async () => {
    const success = await copyToClipboard(url);
    if (success) {
      toast.success('Link copied to clipboard! 📋');
    } else {
      toast.error('Failed to copy link');
    }
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-sm text-gray-600 font-medium">Share:</span>
      
      <button
        onClick={() => shareOnTwitter(text, url)}
        className="p-2 rounded-full bg-blue-50 text-blue-500 hover:bg-blue-100 transition"
        title="Share on Twitter"
        type="button"
      >
        <FaTwitter size={18} />
      </button>
      
      <button
        onClick={() => shareOnFacebook(url)}
        className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
        title="Share on Facebook"
        type="button"
      >
        <FaFacebook size={18} />
      </button>
      
      <button
        onClick={() => shareOnLinkedIn(title, url)}
        className="p-2 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 transition"
        title="Share on LinkedIn"
        type="button"
      >
        <FaLinkedin size={18} />
      </button>
      
      <button
        onClick={() => shareOnWhatsApp(text, url)}
        className="p-2 rounded-full bg-green-50 text-green-600 hover:bg-green-100 transition"
        title="Share on WhatsApp"
        type="button"
      >
        <FaWhatsapp size={18} />
      </button>
      
      <button
        onClick={handleCopyLink}
        className="p-2 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 transition"
        title="Copy link"
        type="button"
      >
        <FaLink size={18} />
      </button>
    </div>
  );
};

export default ShareButtons;