// Types
export interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
  coverUrl: string;
  rating?: number;
  review?: string;
}

export type TabType = 'profile' | 'rate-songs' | 'view-ratings';

// Mock Data
export const mockSongs: Song[] = [
  {
    id: 1,
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    coverUrl: "https://placehold.co/600x400/1db954/000000?text=Blinding+Lights",
    rating: 4,
    review: "Incredible synth-pop vibes, reminds me of the 80s"
  },
  {
    id: 2,
    title: "Good 4 U",
    artist: "Olivia Rodrigo",
    album: "SOUR",
    coverUrl: "https://placehold.co/600x400/1db954/000000?text=Good+4+U",
    rating: 5,
    review: "Pure pop perfection, the energy is unmatched"
  },
  {
    id: 3,
    title: "Stay",
    artist: "The Kid LAROI & Justin Bieber",
    album: "F*CK LOVE 3: OVER YOU",
    coverUrl: "https://placehold.co/600x400/1db954/000000?text=Stay",
    rating: 3
  },
  {
    id: 4,
    title: "Heat Waves",
    artist: "Glass Animals",
    album: "Dreamland",
    coverUrl: "https://placehold.co/600x400/1db954/000000?text=Heat+Waves",
    rating: 4,
    review: "Dreamy and atmospheric, perfect summer vibes"
  },
  {
    id: 5,
    title: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    coverUrl: "https://placehold.co/600x400/1db954/000000?text=Levitating"
  },
  {
    id: 6,
    title: "Watermelon Sugar",
    artist: "Harry Styles",
    album: "Fine Line",
    coverUrl: "https://placehold.co/600x400/1db954/000000?text=Watermelon+Sugar",
    rating: 5,
    review: "Feel-good summer anthem that never gets old"
  }
];