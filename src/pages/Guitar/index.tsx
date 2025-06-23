// import { useEffect, useState } from "react";
// import { db } from "../../lib/firebase";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import { Link } from "react-router-dom";
// import TreeMenu from "../../components/common/TreeMenu";

// const lessons = [
//   {
//     title: "Day 1",
//     parts: [
//       { heading: "Scales", content: "Learn the C major scale and practice ascending and descending." },
//       { heading: "Chords", content: "Practice switching between C and G chords." },
//       { heading: "Song Practice", content: "Play 'Twinkle Twinkle Little Star' using C and G chords." },
//     ],
//   },
//   {
//     title: "Day 2",
//     parts: [
//       { heading: "Scales", content: "Practice the G major scale." },
//       { heading: "Chords", content: "Add D chord and practice transitions." },
//       { heading: "Song Practice", content: "Play 'Row Row Row Your Boat' with C, G, and D chords." },
//     ],
//   },
//   {
//     title: "Day 3",
//     parts: [
//       { heading: "Scales", content: "Review C and G major scales." },
//       { heading: "Chords", content: "Introduce Em chord." },
//       { heading: "Song Practice", content: "Play 'Mary Had a Little Lamb' with C, G, and Em." },
//     ],
//   },
//   {
//     title: "Day 4",
//     parts: [
//       { heading: "Scales", content: "Practice D major scale." },
//       { heading: "Chords", content: "Practice D and Em transitions." },
//       { heading: "Song Practice", content: "Play 'Happy Birthday' with D, G, and Em." },
//     ],
//   },
//   {
//     title: "Day 5",
//     parts: [
//       { heading: "Scales", content: "Combine C, G, and D major scales." },
//       { heading: "Chords", content: "Review all chords learned so far." },
//       { heading: "Song Practice", content: "Play 'Jingle Bells' with C, G, D, and Em." },
//     ],
//   },
//   {
//     title: "Day 6",
//     parts: [
//       { heading: "Scales", content: "Practice scales with a metronome." },
//       { heading: "Chords", content: "Introduce A minor chord." },
//       { heading: "Song Practice", content: "Play 'Let It Be' intro with C, G, Am, and F." },
//     ],
//   },
//   {
//     title: "Day 7",
//     parts: [
//       { heading: "Scales", content: "Review all scales." },
//       { heading: "Chords", content: "Chord changes with strumming patterns." },
//       { heading: "Song Practice", content: "Play 'Stand By Me' with G, Em, C, and D." },
//     ],
//   },
//   {
//     title: "Day 8",
//     parts: [
//       { heading: "Scales", content: "Test yourself on all scales." },
//       { heading: "Chords", content: "Play all chords smoothly." },
//       { heading: "Song Practice", content: "Perform your favorite song using learned chords." },
//     ],
//   },
// ];

// export default function Guitar() {
//   const [courses, setCourses] = useState<any[]>([]);
//   const [selectedLesson, setSelectedLesson] = useState<{
//     section: string;
//     day: number;
//   } | null>(null);

//   useEffect(() => {
//     const fetch = async () => {
//       const q = query(collection(db, "courses"), where("type", "==", "guitar"));
//       const snap = await getDocs(q);
//       setCourses(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
//     };
//     fetch();
//   }, []);

//   return (
   
//     <div className="min-h-screen bg-[#f4f1ee] dark:bg-[#22223b] text-[#4a4e69] dark:text-[#f2e9e4] px-4 py-8">
//       <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
//         {/* Left: Title and Tree Menu */}
//         <div className="w-full md:w-72 flex flex-col items-center md:items-start">
//           <h2 className="text-3xl font-bold mb-4 flex items-center gap-2 text-[#22223b] dark:text-[#4a4e69]">
//             <span role="img" aria-label="guitar">
//               🎸
//             </span>{" "}
//             Guitar Courses
//           </h2>
//           <div className="w-full">
//             <TreeMenu onSelect={setSelectedLesson} />
//           </div>
//         </div>
       
//         <div className="flex-1">
//           {selectedLesson ? (
//             <div className="bg-white dark:bg-[#4a4e69] p-6 rounded-lg shadow mb-6">
//               <h3 className="text-2xl font-semibold mb-2">
//                 {selectedLesson.section} - Day {selectedLesson.day + 1}
//               </h3>
           
//               <div className="space-y-4">
//                 {lessons[selectedLesson.day]?.parts.map((part, idx) => (
//                   <div key={idx} className="border-l-4 border-[#c9ada7] pl-4">
//                     <h4 className="text-lg font-bold mb-1">{part.heading}</h4>
//                     <p className="text-base">{part.content}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {courses.map((course) => (
//                 <div
//                   key={course.id}
//                   className="bg-white dark:bg-[#4a4e69] p-4 rounded-lg shadow hover:shadow-lg transition"
//                 >
//                   <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
//                   <p className="text-sm mb-3">{course.description}</p>
//                   <Link
//                     to={`/course/${course.id}`}
//                     className="text-[#c9ada7] hover:underline"
//                   >
//                     View Course →
//                   </Link>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Link } from "react-router-dom";
import TreeMenu from "../../components/common/TreeMenu";

// 3 sections, each with 8 days, each day has 3 parts
const sections = [
  {
    name: "Section 1",
    lessons: [
      {
        title: "Day 1",
        parts: [
          { heading: "Scales", content: "Learn the C major scale and practice ascending and descending." },
          { heading: "Chords", content: "Practice switching between C and G chords." },
          { heading: "Song Practice", content: "Play 'Twinkle Twinkle Little Star' using C and G chords." },
        ],
      },
      {
        title: "Day 2",
        parts: [
          { heading: "Scales", content: "Practice the G major scale." },
          { heading: "Chords", content: "Add D chord and practice transitions." },
          { heading: "Song Practice", content: "Play 'Row Row Row Your Boat' with C, G, and D chords." },
        ],
      },
      {
        title: "Day 3",
        parts: [
          { heading: "Scales", content: "Review C and G major scales." },
          { heading: "Chords", content: "Introduce Em chord." },
          { heading: "Song Practice", content: "Play 'Mary Had a Little Lamb' with C, G, and Em." },
        ],
      },
      {
        title: "Day 4",
        parts: [
          { heading: "Scales", content: "Practice D major scale." },
          { heading: "Chords", content: "Practice D and Em transitions." },
          { heading: "Song Practice", content: "Play 'Happy Birthday' with D, G, and Em." },
        ],
      },
      {
        title: "Day 5",
        parts: [
          { heading: "Scales", content: "Combine C, G, and D major scales." },
          { heading: "Chords", content: "Review all chords learned so far." },
          { heading: "Song Practice", content: "Play 'Jingle Bells' with C, G, D, and Em." },
        ],
      },
      {
        title: "Day 6",
        parts: [
          { heading: "Scales", content: "Practice scales with a metronome." },
          { heading: "Chords", content: "Introduce A minor chord." },
          { heading: "Song Practice", content: "Play 'Let It Be' intro with C, G, Am, and F." },
        ],
      },
      {
        title: "Day 7",
        parts: [
          { heading: "Scales", content: "Review all scales." },
          { heading: "Chords", content: "Chord changes with strumming patterns." },
          { heading: "Song Practice", content: "Play 'Stand By Me' with G, Em, C, and D." },
        ],
      },
      {
        title: "Day 8",
        parts: [
          { heading: "Scales", content: "Test yourself on all scales." },
          { heading: "Chords", content: "Play all chords smoothly." },
          { heading: "Song Practice", content: "Perform your favorite song using learned chords." },
        ],
      },
    ],
  },
  // Section 2 and Section 3 can be filled similarly or with different content
  {
    name: "Section 2",
    lessons: Array.from({ length: 8 }, (_, i) => ({
      title: `Day ${i + 1}`,
      parts: [
        { heading: "Scales", content: `Section 2 - Day ${i + 1} Scales content.` },
        { heading: "Chords", content: `Section 2 - Day ${i + 1} Chords content.` },
        { heading: "Song Practice", content: `Section 2 - Day ${i + 1} Song Practice content.` },
      ],
    })),
  },
  {
    name: "Section 3",
    lessons: Array.from({ length: 8 }, (_, i) => ({
      title: `Day ${i + 1}`,
      parts: [
        { heading: "Scales", content: `Section 3 - Day ${i + 1} Scales content.` },
        { heading: "Chords", content: `Section 3 - Day ${i + 1} Chords content.` },
        { heading: "Song Practice", content: `Section 3 - Day ${i + 1} Song Practice content.` },
      ],
    })),
  },
];

export default function Guitar() {
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<{
    sectionIdx: number;
    dayIdx: number;
  } | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const q = query(collection(db, "courses"), where("type", "==", "guitar"));
      const snap = await getDocs(q);
      setCourses(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetch();
  }, []);

  return (
    <div className="min-h-screen bg-[#f4f1ee] dark:bg-[#22223b] text-[#4a4e69] dark:text-[#f2e9e4] px-4 py-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Left: Title and Tree Menu */}
        <div className="w-full md:w-72 flex flex-col items-center md:items-start">
          <h2 className="text-3xl font-bold mb-4 flex items-center gap-2 text-[#22223b] dark:text-[#4a4e69]">
            <span role="img" aria-label="guitar">
              🎸
            </span>{" "}
            Guitar Courses
          </h2>
          <div className="w-full">
            <TreeMenu
              sections={sections}
              onSelect={(sectionIdx, dayIdx) => setSelectedLesson({ sectionIdx, dayIdx })}
            />
          </div>
        </div>
        {/* Right: Content */}
        <div className="flex-1">
          {selectedLesson ? (
            <div className="bg-white dark:bg-[#4a4e69] p-6 rounded-lg shadow mb-6">
              <h3 className="text-2xl font-semibold mb-4">
                {sections[selectedLesson.sectionIdx].name} - {sections[selectedLesson.sectionIdx].lessons[selectedLesson.dayIdx].title}
              </h3>
              <div className="space-y-4">
                {sections[selectedLesson.sectionIdx].lessons[selectedLesson.dayIdx].parts.map((part, idx) => (
                  <div key={idx} className="border-l-4 border-[#c9ada7] pl-4">
                    <h4 className="text-lg font-bold mb-1">{part.heading}</h4>
                    <p className="text-base">{part.content}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white dark:bg-[#4a4e69] p-4 rounded-lg shadow hover:shadow-lg transition"
                >
                  <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                  <p className="text-sm mb-3">{course.description}</p>
                  <Link
                    to={`/course/${course.id}`}
                    className="text-[#c9ada7] hover:underline"
                  >
                    View Course →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}