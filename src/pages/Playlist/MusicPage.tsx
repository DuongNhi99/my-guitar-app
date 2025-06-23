import React, { useState, useEffect } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { collection, addDoc, onSnapshot, Timestamp } from "firebase/firestore";
import { storage, db } from "../../lib/firebase"; // adjust path if needed

interface Song {
  id: string;
  title: string;
  artist: string;
  url: string;
  createdAt: Timestamp;
}

const MusicPage = () => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "songs"), (snapshot) => {
      const list = snapshot.docs.map((doc) => {
        const { id: _id, ...data } = doc.data() as Song & { id?: string };
        return {
          id: doc.id,
          ...data,
        };
      });
      setSongs(
        list.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis())
      );
    });
    return () => unsub();
  }, []);

  const handleUpload = async () => {
    if (!title || !artist || !file) {
      alert("Please enter title, artist, and select a file");
      return;
    }

    const fileName = `music/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, "_")}`;
    const fileRef = ref(storage, fileName);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);

    await addDoc(collection(db, "songs"), {
      title,
      artist,
      url,
      createdAt: Timestamp.now(),
    });

    setTitle("");
    setArtist("");
    setFile(null);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🎵 Upload MP3</h2>
      <div className="flex flex-col gap-3 mb-6">
        <input
          type="text"
          placeholder="Title"
          className="border p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Artist"
          className="border p-2"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />
        <input
          type="file"
          accept="audio/mp3"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <button
          onClick={handleUpload}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Upload
        </button>
      </div>

      <h3 className="text-xl font-semibold mb-2">🎧 Playlist</h3>
      <div className="space-y-4">
        {songs.map((song) => (
          <div
            key={song.id}
            className="p-4 border rounded shadow bg-white dark:bg-gray-800"
          >
            <p className="font-semibold">
              {song.title} — {song.artist}
            </p>
            <audio controls className="w-full mt-2">
              <source src={song.url} type="audio/mp3" />
              Your browser does not support the audio tag.
            </audio>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MusicPage;
