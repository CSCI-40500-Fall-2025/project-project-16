import React from 'react'
import type { Song } from '../mockData/mockSongs'

type ProfileStatsProps = {
  songs: Song[]
}

const ProfileStats: React.FC<ProfileStatsProps> = ({ songs }) => {
  const ratedSongs = songs.filter(s => s.rating)
  const avgRating =
    ratedSongs.length > 0
      ? (ratedSongs.reduce((acc, s) => acc + (s.rating || 0), 0) / ratedSongs.length).toFixed(1)
      : '0'
  const reviewCount = songs.filter(s => s.review).length

  return (
    <div className="grid grid-cols-3 gap-8 text-center">
      <div>
        <div className="text-2xl font-bold text-green-400">{ratedSongs.length}</div>
        <div className="text-gray-400 text-sm">Songs Rated</div>
      </div>
      <div>
        <div className="text-2xl font-bold text-green-400">{avgRating}</div>
        <div className="text-gray-400 text-sm">Avg Rating</div>
      </div>
      <div>
        <div className="text-2xl font-bold text-green-400">{reviewCount}</div>
        <div className="text-gray-400 text-sm">Reviews Written</div>
      </div>
    </div>
  )
}

export default ProfileStats