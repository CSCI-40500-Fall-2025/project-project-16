import React from 'react'
import { Music, Star, User, Eye } from 'lucide-react'
import { TabType } from '../mockData/mockSongs'

type NavbarProps = {
  activeTab: TabType
  setActiveTab: (tab: TabType) => void
  NavButton: React.FC<{
    tab: TabType
    activeTab: TabType
    onClick: (tab: TabType) => void
    icon: React.ReactNode
    label: string
  }>
}

{/* MAKE NAVBAR COMPONENT */}
const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, NavButton }) => (
  <nav className="bg-black bg-opacity-50 backdrop-blur-sm border-b border-gray-700">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <div className="bg-green-500 p-2 rounded-lg">
            <Music className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-white">
            JukeBox<span className="text-green-400">d</span>
          </span>
        </div>
        {/* Navigation Buttons */}
        <div className="flex space-x-8">
          <NavButton
            tab="profile"
            activeTab={activeTab}
            onClick={setActiveTab}
            icon={<User className="w-4 h-4" />}
            label="Profile"
          />
          <NavButton
            tab="rate-songs"
            activeTab={activeTab}
            onClick={setActiveTab}
            icon={<Star className="w-4 h-4" />}
            label="Rate Songs"
          />
          <NavButton
            tab="view-ratings"
            activeTab={activeTab}
            onClick={setActiveTab}
            icon={<Eye className="w-4 h-4" />}
            label="View Ratings"
          />
        </div>
      </div>
    </div>
  </nav>
)

export default Navbar