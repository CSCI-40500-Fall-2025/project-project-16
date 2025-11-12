import { render, screen } from '@testing-library/react'
import ProfileStats from './component/ProfileStats'
import { mockSongs } from './mockData/mockSongs'

describe('ProfileStats', () => {
  it('renders the correct number of rated songs', () => {
    render(<ProfileStats songs={mockSongs} />)
    const ratedSongs = mockSongs.filter((s) => s.rating).length
    expect(screen.getByText(ratedSongs.toString())).toBeInTheDocument()
  })

  it('renders the correct average rating', () => {
    render(<ProfileStats songs={mockSongs} />)
    const ratedSongs = mockSongs.filter((s) => s.rating)
    const avgRating =
      ratedSongs.length > 0
        ? (ratedSongs.reduce((acc, s) => acc + (s.rating || 0), 0) / ratedSongs.length).toFixed(1)
        : '0'

    expect(screen.getByText(avgRating)).toBeInTheDocument()
  })

  it('renders the correct number of reviews written', () => {
    render(<ProfileStats songs={mockSongs} />)
    const reviewCount = mockSongs.filter((s) => s.review).length
    expect(screen.getByText(reviewCount.toString())).toBeInTheDocument()
  })
})
