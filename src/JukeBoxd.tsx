import React, { useState } from 'react';
import { Star, User } from 'lucide-react';
import type {TabType } from './mockData/mockSongs'
import { mockSongs } from './mockData/mockSongs'
import Navbar from './component/Navbar'
import NavButton from './component/NavButton'
import ProfileStats from './component/ProfileStats'
import SongCard from './component/SongCard'
 
/**
 * Main JukeBoxd App Component 
 */
const JukeBoxd: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('rate-songs');

  // Content renderer based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            {/* Profile Header */}
            <div className="text-center">
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Music Lover</h2>
              <p className="text-gray-400">Discovering and rating amazing music</p>
            </div>
            
            {/* Profile Stats */}
            <ProfileStats songs={mockSongs} />
          </div>
        );
        
      case 'rate-songs':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Rate Songs</h2>
            <div className="grid gap-4">
              {mockSongs.map(song => (
                <SongCard key={song.id} song={song} />
              ))}
            </div>
          </div>
        );
        
      case 'view-ratings':
        const ratedSongs = mockSongs.filter(song => song.rating);
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Your Ratings</h2>
            {ratedSongs.length === 0 ? (
              <div className="text-center text-gray-400 py-12">
                <Star className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                <p>No ratings yet. Start rating some songs!</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {ratedSongs.map(song => (
                  <SongCard key={song.id} song={song} showRateButton={false} />
                ))}
              </div>
            )}
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
    {/* Navigation Bar */}
    <Navbar activeTab={activeTab} setActiveTab={setActiveTab} NavButton={NavButton} />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default JukeBoxd;
