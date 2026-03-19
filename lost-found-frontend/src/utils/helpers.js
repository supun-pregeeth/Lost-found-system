const image1 = "https://images.unsplash.com/photo-1637486069202-b1163268c240?q=80&w=1325&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const image2 = "https://images.unsplash.com/photo-1696092229598-3e6e32432aaf?q=80&w=1020&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const image3 = "https://images.unsplash.com/photo-1760708551271-05d0bc471590?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGlwaG9uZSUyMDE1JTIwcHJvJTIwb24lMjB0aGUlMjB0YWJsZXxlbnwwfHwwfHx8MA%3D%3D";
const image4 = "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2V5c3xlbnwwfHwwfHx8MA%3D%3D";
const image5 = "https://images.unsplash.com/photo-1692579277415-fd0da600b38d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG1hY2Jvb2slMjBwcm8lMjAxNCUyMG9uJTIwdGhlJTIwdGFibGV8ZW58MHx8MHx8fDA%3D";
const image6 = "https://images.unsplash.com/photo-1763034179057-acad3a072568?q=80&w=791&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

//convert a date like March 8, 2025
export const formatDate = (dateStr) => {

  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

//timeAgo
export const timeAgo = (dateStr) => {

  const now = new Date();
  const date = new Date(dateStr);
  const diff = Math.floor((now - date) / 1000); // in seconds
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return formatDate(dateStr);
};

//Cuts long text and adds ellipsis
export const truncate = (str, max = 120) =>
  str?.length > max ? str.slice(0, max) + '…' : str;

export const getCategoryIcon = (category) => {
  const icons = {
    electronics: '📱', bags: '👜', keys: '🔑', wallet: '💳',
    clothing: '👕', jewelry: '💍', documents: '📄', pets: '🐾',
    glasses: '👓', other: '📦',
  };
  return icons[category?.toLowerCase()] || '📦';
};

export const CATEGORIES = [
  'Electronics', 'Bags', 'Keys', 'Wallet', 'Clothing',
  'Jewelry', 'Documents', 'Pets', 'Glasses', 'Other'
];

export const LOCATIONS = [
  'Airport', 'Train Station', 'Bus Terminal', 'Mall', 'Park',
  'Restaurant', 'Hotel', 'University', 'Hospital', 'Office', 'Other'
];

// Mock data for demo
export const MOCK_ITEMS = [
  { id: 1, type: 'lost', title: 'Black Leather Wallet', category: 'wallet', location: 'Central Park', date: '2025-03-08', description: 'Brown leather wallet with initials JD, contains credit cards and ID. Last seen near the fountain.', image: image1, user: { name: 'James D.', avatar: null }, reward: '$50', urgent: true },
  { id: 3, type: 'lost', title: 'Gold Ring with Emerald Stone', category: 'jewelry', location: 'The Met Museum', date: '2025-03-07', description: 'Heirloom ring, 18k gold with oval emerald. Inscription inside reads "Forever – 1987".', image: image2, user: { name: 'Elena K.', avatar: null }, reward: '$200', urgent: true },
  { id: 4, type: 'found', title: 'Set of House Keys on Blue Lanyard', category: 'keys', location: 'Riverside Park', date: '2025-03-09', description: 'Five keys on a blue braided lanyard with a small elephant charm.', image: image4, user: { name: 'Marco T.', avatar: null }, reward: null, urgent: false },
  { id: 2, type: 'found', title: 'iPhone 15 Pro — Space Black', category: 'electronics', location: 'Grand Central Station', date: '2025-03-09', description: 'Found near Track 7. Screen cracked on corner. Has a custom case with stars pattern.',image: image3, user: { name: 'Sarah M.', avatar: null }, reward: null, urgent: false },
  { id: 5, type: 'lost', title: 'MacBook Pro 14" Silver', category: 'electronics', location: 'Blue Bottle Coffee, SoHo', date: '2025-03-06', description: 'Silver MacBook Pro with stickers on back. Has a distinctive crack on the bottom-left corner of screen.', image: image5, user: { name: 'Priya N.', avatar: null }, reward: '$300', urgent: true },
  { id: 6, type: 'found', title: 'Vintage Leather Briefcase', category: 'bags', location: 'Penn Station', date: '2025-03-08', description: 'Dark tan leather briefcase, monogrammed "R.H.W." Contains some papers.', image: image6, user: { name: 'David L.', avatar: null }, reward: null, urgent: false },
];
