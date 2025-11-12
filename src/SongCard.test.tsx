import { render, screen } from '@testing-library/react'
import SongCard from './component/SongCard'
import { mockSongs } from './mockData/mockSongs'

describe('SongCard', () => {
  it('renders song title, artist, and album', () => {
    const song = mockSongs[0] // Blinding Lights
    render(<SongCard song={song} />)

    expect(screen.getByText(song.title)).toBeInTheDocument()
    expect(screen.getByText(song.artist)).toBeInTheDocument()
    expect(screen.getByText(song.album)).toBeInTheDocument()
  })

  it('renders rating stars if song has rating', () => {
    const song = mockSongs[0] 
    render(<SongCard song={song} />)
    expect(screen.getByText(`${song.rating}/5`)).toBeInTheDocument()
  })

  it('renders review if song has review', () => {
    const song = mockSongs[0] 
    render(<SongCard song={song} />)

    expect(screen.getByText(song.review!)).toBeInTheDocument()
  })

  it('shows "Rate this song" button for unrated songs', () => {
    const unratedSong = mockSongs.find((s) => !s.rating)!
    render(<SongCard song={unratedSong} />)

    const button = screen.getByText(/Rate this song/i)
    expect(button).toBeInTheDocument()
  })
})
