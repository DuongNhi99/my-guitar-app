// import { useState, useEffect } from "react";
// import {
//   collection,
//   addDoc,
//   getDocs,
//   deleteDoc,
//   doc,
//   updateDoc,
// } from "firebase/firestore";
// import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
// import { db, storage } from "../../lib/firebase";
// import toast from "react-hot-toast";

// export default function MusicPage() {
//   const [title, setTitle] = useState("");
//   const [file, setFile] = useState<File | null>(null);
//   const [musicList, setMusicList] = useState<any[]>([]);
//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [audioUrl, setAudioUrl] = useState("");

//   const fetchMusic = async () => {
//     const snap = await getDocs(collection(db, "music"));
//     setMusicList(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
//   };

//   // const handleUpload = async () => {
//   //   if (!title || !file) return toast.error("Title and MP3 file required");

//   //   const storageRef = ref(storage, `music/${Date.now()}-${file.name}`);
//   //   await uploadBytes(storageRef, file);
//   //   const url = await getDownloadURL(storageRef);

//   //   await addDoc(collection(db, "music"), { title, url, storagePath: storageRef.fullPath });
//   //   toast.success("Music uploaded!");
//   //   setTitle("");
//   //   setFile(null);
//   //   fetchMusic();
//   // };
// 	const handleUpload = async () => {
//   if (!file) return;

//   // Clean filename
//   const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, "_")}`;
//   const fileRef = ref(storage, `music/${fileName}`);

//   try {
//     await uploadBytes(fileRef, file); // ✅ Firebase SDK handles CORS

//     const downloadURL = await getDownloadURL(fileRef); // Get file URL
//     console.log("Download URL:", downloadURL);
//   } catch (err) {
//     console.error("Upload error:", err);
//   }
// };

//   const handleDelete = async (music: any) => {
//     if (!window.confirm("Delete this song?")) return;
//     await deleteDoc(doc(db, "music", music.id));
//     await deleteObject(ref(storage, music.storagePath));
//     toast.success("Deleted");
//     fetchMusic();
//   };

//   const handleEdit = (music: any) => {
//     setEditingId(music.id);
//     setTitle(music.title);
//     setAudioUrl(music.url);
//   };

//   const handleUpdate = async () => {
//     if (!editingId) return;

//     await updateDoc(doc(db, "music", editingId), { title });
//     toast.success("Updated");
//     setEditingId(null);
//     setTitle("");
//     setAudioUrl("");
//     fetchMusic();
//   };

//   useEffect(() => {
//     fetchMusic();
//   }, []);

//   return (
//     <div className="max-w-2xl mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">🎵 Music Playlist</h2>

//       <div className="space-y-4 bg-white dark:bg-gray-800 p-4 rounded shadow mb-6">
//         <input
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="Song title"
//           className="w-full input-style"
//         />
//         {!editingId && (
//           <input
//             type="file"
//             accept=".mp3"
//             onChange={(e) => setFile(e.target.files?.[0] || null)}
//             className="w-full input-style"
//           />
//         )}

//         {editingId ? (
//           <button onClick={handleUpdate} className="btn-primary w-full">
//             Update
//           </button>
//         ) : (
//           <button onClick={handleUpload} className="btn-primary w-full">
//             Upload
//           </button>
//         )}
//       </div>

//       <div className="space-y-6">
//         {musicList.map((music) => (
//           <div
//             key={music.id}
//             className="p-4 bg-white dark:bg-gray-700 rounded shadow space-y-2"
//           >
//             <div className="flex justify-between items-center">
//               <h3 className="font-semibold">{music.title}</h3>
//               <div className="space-x-3 text-sm">
//                 <button
//                   onClick={() => handleEdit(music)}
//                   className="text-blue-500 hover:underline"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(music)}
//                   className="text-red-500 hover:underline"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//             <audio controls className="w-full">
//               <source src={music.url} type="audio/mp3" />
//               Your browser does not support the audio element.
//             </audio>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
// import { useEffect, useState } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../../lib/firebase"; // Make sure this points to your Firebase config

// type Song = {
//   id: string;
//   title: string;
//   url: string;
// };

// export default function MusicPage() {
//   const [songs, setSongs] = useState<Song[]>([]);
//   const [currentUrl, setCurrentUrl] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchSongs = async () => {
//       try {
//         const snapshot = await getDocs(collection(db, "music"));
//         const songList = snapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//         })) as Song[];
//         setSongs(songList);
//       } catch (err) {
//         console.error("Error loading songs", err);
//       }
//     };
//     fetchSongs();
//   }, []);

//   return (
//     <div className="p-4 max-w-xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">🎶 MP3 Playlist</h1>

//       <ul className="space-y-2">
//         {songs.map((song) => (
//           <li key={song.id}>
//             <button
//               className="text-blue-500 hover:underline"
//               onClick={() => setCurrentUrl(song.url)}
//             >
//               ▶ {song.title}
//             </button>
//           </li>
//         ))}
//       </ul>

//       {currentUrl && (
//         <div className="mt-6">
//           <audio src={currentUrl} controls autoPlay className="w-full" />
//         </div>
//       )}
//     </div>
//   );
// }
// src/pages/MusicPage.tsx
import React, { useState, useEffect } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { collection, addDoc, onSnapshot, Timestamp } from 'firebase/firestore';
import { storage, db } from '../../lib/firebase'; // adjust path if needed

interface Song {
  id: string;
  title: string;
  artist: string;
  url: string;
  createdAt: Timestamp;
}

const MusicPage = () => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'songs'),
      (snapshot) => {
        const list = snapshot.docs.map((doc) => {
          const { id: _id, ...data } = doc.data() as Song & { id?: string };
          return {
            id: doc.id,
            ...data,
          };
        });
        setSongs(list.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis()));
      }
    );
    return () => unsub();
  }, []);

  const handleUpload = async () => {
    if (!title || !artist || !file) {
      alert('Please enter title, artist, and select a file');
      return;
    }

    const fileName = `music/${Date.now()}-${file.name}`;
    const fileRef = ref(storage, fileName);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);

    await addDoc(collection(db, 'songs'), {
      title,
      artist,
      url,
      createdAt: Timestamp.now(),
    });

    setTitle('');
    setArtist('');
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
            <p className="font-semibold">{song.title} — {song.artist}</p>
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
