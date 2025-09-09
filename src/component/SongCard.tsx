import React from 'react'
import { Star, Plus } from 'lucide-react'
import { Song } from '../mockData/mockSongs'

type SongCardProps = {
  song: Song
  showRateButton?: boolean
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex space-x-1">
    {Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'fill-green-400 text-green-400' : 'text-gray-600'
        }`}
      />
    ))}
  </div>
)

const SongCard: React.FC<SongCardProps> = ({ song, showRateButton = true }) => (
  <div className="bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition-all duration-200 group">
    <div className="flex items-start space-x-4">
      {/* Album Cover */}
      <div className="relative">
        <img
          src={song.coverUrl}
          alt={`${song.album} cover`}
          className="w-16 h-16 rounded-md object-cover shadow-lg"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-md transition-opacity duration-200" />
      </div>

      {/* Song Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-white font-semibold text-lg truncate">{song.title}</h3>
        <p className="text-gray-400 text-sm truncate">{song.artist}</p>
        <p className="text-gray-500 text-xs truncate">{song.album}</p>

        {/* Rating Display */}
        {song.rating && (
          <div className="flex items-center space-x-2 mt-2">
            <StarRating rating={song.rating} />
            <span className="text-green-400 text-sm font-medium">{song.rating}/5</span>
          </div>
        )}

        {/* Review Text */}
        {song.review && (
          <p className="text-gray-300 text-sm mt-2 line-clamp-2">{song.review}</p>
        )}

        {/* Rate Button for Unrated Songs */}
        {!song.rating && showRateButton && (
          <button className="flex items-center space-x-1 mt-2 text-green-400 hover:text-green-300 text-sm transition-colors">
            <Plus className="w-4 h-4" />
            <span>Rate this song</span>
          </button>
        )}
      </div>
    </div>
  </div>
)

export default SongCard