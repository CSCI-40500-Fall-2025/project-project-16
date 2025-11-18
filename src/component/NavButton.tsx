import React from 'react'
import type { TabType } from '../types'

type NavButtonProps = {
  tab: TabType
  activeTab: TabType
  onClick: (tab: TabType) => void
  icon: React.ReactNode
  label: string
}

const NavButton: React.FC<NavButtonProps> = ({ tab, activeTab, onClick, icon, label }) => {
  const isActive = activeTab === tab

  return (
    <button
      onClick={() => onClick(tab)}
      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive
          ? 'text-green-400 bg-green-400 bg-opacity-10'
          : 'text-gray-300 hover:text-white hover:bg-gray-700'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}

export default NavButton