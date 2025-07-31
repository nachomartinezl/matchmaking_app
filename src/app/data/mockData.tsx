// src/app/data/mockData.tsx
import { FaUserAlt, FaBalanceScale, FaSmile, FaUserFriends } from 'react-icons/fa';

export const matchesData = [
  {
    id: 1,
    name: 'Lauren',
    age: 24,
    imageUrl: 'https://images.pexels.com/photos/247878/pexels-photo-247878.jpeg',
    bio: 'Passionate about art, music, and exploring new places. Looking for someone who enjoys deep conversations and spontaneous adventures.',
    height: "5'7\"",
    sign: 'Libra',
    country: 'United States',
  },
  {
    id: 2,
    name: 'Annie',
    age: 30,
    imageUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    bio: 'Coffee enthusiast, book lover, and outdoor adventurer. I value authenticity and am looking for someone with similar interests.',
    height: "5'5\"",
    sign: 'Taurus',
    country: 'Canada',
  },
  {
    id: 3,
    name: 'Luna',
    age: 29,
    imageUrl: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg',
    bio: 'Yoga instructor by day, stargazer by night. Seeking a connection with someone who appreciates mindfulness and the beauty of the universe.',
    height: "5'9\"",
    sign: 'Pisces',
    country: 'Australia',
  },
  {
    id: 4,
    name: 'Maya',
    age: 27,
    imageUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    bio: 'UX designer who loves street photography, vintage films, and late-night talks under the stars. Looking for depth, humor, and shared adventures.',
    height: "5'6\"",
    sign: 'Gemini',
    country: 'Germany',
  },
];

export const trainingTopics = [
  { id: 'personality', name: 'Personality', icon: <FaUserAlt /> },
  { id: 'character', name: 'Character', icon: <FaBalanceScale /> },
  { id: 'emotional', name: 'Emotional', icon: <FaSmile /> },
  { id: 'values', name: 'Values', icon: <FaUserFriends /> },
];
