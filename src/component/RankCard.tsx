import React from 'react'
import type { Artist } from '../types'

type Props = {
  artist: Artist
  highlighted?: boolean
  onSelect?: () => void
  selectLabel?: string
}

const RankCard: React.FC<Props> = ({ artist, highlighted = false, onSelect, selectLabel }) => {
  return (
    <div className={`bg-gray-800 rounded-lg p-4 flex items-center space-x-4 ${highlighted ? 'ring-2 ring-green-400' : ''}`}>
      <img src={artist.image_url} alt={artist.name} className="w-16 h-16 rounded-md object-cover" />
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <h3 className="text-white font-semibold truncate">{artist.name}</h3>
          <span className="text-green-400 font-medium">{artist.elo.toFixed(1)}</span>
        </div>
        <p className="text-gray-400 text-sm truncate">id: {artist.id}</p>
        {onSelect && (
          <button onClick={onSelect} className="mt-3 inline-flex items-center px-3 py-1 rounded-md text-sm text-green-400 hover:text-green-300">
            {selectLabel ?? 'Choose'}
          </button>
        )}
      </div>
    </div>
  )
}

export default RankCard