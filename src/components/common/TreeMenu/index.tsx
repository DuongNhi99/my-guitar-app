

// import React, { useState } from "react";

// interface TreeMenuProps {
//   onSelect: (value: { section: string; day: number }) => void;
// }

// const sections = ["Section 1", "Section 2", "Section 3"];

// const daysPerSection = [1, 2, 3, 4, 5, 6, 7, 8];

// export default function TreeMenu({ onSelect }: TreeMenuProps) {
//   const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({
//     "Section 1": false,
//     "Section 2": false,
//     "Section 3": false,
//   });

// 	  const [selected, setSelected] = useState<{ section: string; day: number } | null>(null);


//   const toggleSection = (section: string) => {
//     setExpanded((prev) => ({
//       ...prev,
//       [section]: !prev[section],
//     }));
//   };

// 	  const handleDayClick = (section: string, day: number) => {
//     setSelected({ section, day });
//     onSelect({ section, day });
//   };

//   return (
 
// 		<nav className="text-[#4a4e69] w-full max-w-xs bg-white dark:bg-[#f2e9e4] rounded shadow p-4 mb-6 md:mb-0 md:w-64 transition" aria-label="Course Tree">
//       <ul>
//         {sections.map((section) => (
//           <li key={section} className="mb-2">
//             <button
//               onClick={() => toggleSection(section)}
//               className="font-semibold text-left w-full flex items-center text-[#4a4e69] dark:text-[#4a4e69] focus:outline-none"
//               aria-expanded={expanded[section]}
//               aria-controls={`section-${section}`}
//             >
//               <span className="mr-1">{expanded[section] ? "▼" : "▶"}</span>
//               {section}
//             </button>
//             {expanded[section] && (
//               <ul id={`section-${section}`} className="ml-6 mt-1">
//                 {daysPerSection.map((day, i) => (
//                   <li
//                     key={i}
//                     className={`py-0.5 text-[#4a4e69] dark:text-[#22223b] hover:underline cursor-pointer transition ${
//                       selected?.section === section && selected?.day === i
//                         ? "font-bold underline"
//                         : ""
//                     }`}
//                     onClick={() => handleDayClick(section, i)}
//                   >
//                     Day {i + 1}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// }

import React, { useState } from "react";

interface TreeMenuProps {
  sections: {
    name: string;
    lessons: { title: string; parts: { heading: string; content: string }[] }[];
  }[];
  onSelect: (sectionIdx: number, dayIdx: number) => void;
}

export default function TreeMenu({ sections, onSelect }: TreeMenuProps) {
  const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({ 0: false, 1: false, 2: false });
  const [selected, setSelected] = useState<{ sectionIdx: number; dayIdx: number } | null>(null);

  const toggleSection = (idx: number) => {
    setExpanded((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const handleDayClick = (sectionIdx: number, dayIdx: number) => {
    setSelected({ sectionIdx, dayIdx });
    onSelect(sectionIdx, dayIdx);
  };

  return (
    <nav
      className="
        text-[#4a4e69]
        w-full
        max-w-xs
        bg-white
        dark:bg-[#f2e9e4]
        rounded
        shadow
        p-4
        mb-6
        md:mb-0
        md:w-64
        transition
      "
      aria-label="Course Tree"
    >
      <ul>
        {sections.map((section, sectionIdx) => (
          <li key={section.name} className="mb-2">
            <button
              onClick={() => toggleSection(sectionIdx)}
              className="font-semibold text-left w-full flex items-center text-[#4a4e69] dark:text-[#4a4e69] focus:outline-none"
              aria-expanded={!!expanded[sectionIdx]}
              aria-controls={`section-${sectionIdx}`}
            >
              <span className="mr-1">{expanded[sectionIdx] ? "▼" : "▶"}</span>
              {section.name}
            </button>
            {expanded[sectionIdx] && (
              <ul id={`section-${sectionIdx}`} className="ml-6 mt-1">
                {section.lessons.map((lesson, dayIdx) => (
                  <li
                    key={lesson.title}
                    className={`py-0.5 text-[#4a4e69] dark:text-[#22223b] hover:underline cursor-pointer transition ${
                      selected?.sectionIdx === sectionIdx && selected?.dayIdx === dayIdx
                        ? "font-bold underline"
                        : ""
                    }`}
                    onClick={() => handleDayClick(sectionIdx, dayIdx)}
                  >
                    {lesson.title}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}