import { mockSongs } from './mockData/mockSongs'

describe('mockSongs', () => {
  it('should contain 6 songs', () => {
    expect(mockSongs.length).toBe(6)
  })

  it('should have required properties for each song', () => {
    mockSongs.forEach((song) => {
      expect(song).toHaveProperty('id')
      expect(song).toHaveProperty('title')
      expect(song).toHaveProperty('artist')
      expect(song).toHaveProperty('album')
      expect(song).toHaveProperty('coverUrl')
    })
  })

  it('should include "Blinding Lights" by The Weeknd', () => {
    const song = mockSongs.find((s) => s.title === 'Blinding Lights')
    expect(song).toBeDefined()
    expect(song?.artist).toBe('The Weeknd')
  })
})