// src/pages/PlaylistPage.tsx
import { useState } from "react";

interface Track {
  name: string;
  file: File;
  url: string;
}

export default function PlaylistPage() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

  const handleAddTrack = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const url = URL.createObjectURL(file);

    setTracks((prev) => [...prev, { name: file.name, file, url }]);
  };

  const playTrack = (track: Track) => {
    setCurrentTrack(track);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">🎵 MP3 Playlist</h1>

      <input type="file" accept="audio/mp3" onChange={handleAddTrack} className="input-style" />

      <ul className="space-y-2">
        {tracks.map((track, idx) => (
          <li
            key={idx}
            className="p-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
            onClick={() => playTrack(track)}
          >
            {track.name}
          </li>
        ))}
      </ul>

      {currentTrack && (
        <div className="mt-4">
          <h2 className="font-semibold">Now Playing: {currentTrack.name}</h2>
          <audio controls autoPlay className="w-full mt-2">
            <source src={currentTrack.url} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
}
