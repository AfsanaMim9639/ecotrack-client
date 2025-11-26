// Social share utilities

export const shareOnTwitter = (text, url) => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
  window.open(twitterUrl, '_blank', 'width=550,height=420');
};

export const shareOnFacebook = (url) => {
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  window.open(facebookUrl, '_blank', 'width=550,height=420');
};

export const shareOnLinkedIn = (title, url) => {
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  window.open(linkedInUrl, '_blank', 'width=550,height=420');
};

export const shareOnWhatsApp = (text, url) => {
  const message = `${text} ${url}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
};

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy:', error);
    return false;
  }
};

// Generate share text for different content types
export const generateShareText = {
  challenge: (challengeTitle) => 
    `🌱 I just joined the "${challengeTitle}" challenge on EcoTrack! Join me in making a difference for our planet! 🌍`,
  
  completion: (challengeTitle, points) => 
    `🎉 I just completed the "${challengeTitle}" challenge and earned ${points} points on EcoTrack! 💚 #EcoWarrior #Sustainability`,
  
  tip: (tipTitle) => 
    `💡 Great eco-tip from EcoTrack: "${tipTitle}" - Check it out!`,
  
  badge: (badgeName) => 
    `🏆 I just earned the "${badgeName}" badge on EcoTrack! Making progress towards a greener future! 🌿`,
  
  leaderboard: (position, points) => 
    `🎯 I'm ranked #${position} on the EcoTrack leaderboard with ${points} points! Join me in the environmental challenge! 🌱`
};

export default {
  shareOnTwitter,
  shareOnFacebook,
  shareOnLinkedIn,
  shareOnWhatsApp,
  copyToClipboard,
  generateShareText
};