export type TabType = 'profile' | 'rate-songs' | 'view-ratings' | 'ranks';

export type Artist = {
  id: number
  name: string
  image_url: string
  elo: number
}