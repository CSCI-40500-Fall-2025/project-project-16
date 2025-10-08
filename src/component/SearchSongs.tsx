// src/searchSongs.tsx
import { useState } from "react";
import { mockSongs } from "../mockData/mockSongs";
import type { Song } from "../mockData/mockSongs";

export const useSearchSongs = () => {
  const [query, setQuery] = useState("");
  const [filteredSongs, setFilteredSongs] = useState<Song[]>(mockSongs);

  const handleSearch = (input: string) => {
    setQuery(input);

    const results = mockSongs.filter(
      (song) =>
        song.title.toLowerCase().includes(input.toLowerCase()) ||
        song.artist.toLowerCase().includes(input.toLowerCase())
    );

    setFilteredSongs(results);
  };

  return { query, filteredSongs, handleSearch };
};
