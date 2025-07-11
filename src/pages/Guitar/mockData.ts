
// 3 sections, each with 8 days, each day has 3 parts

// type Section = {
// 	name: string;
// 	lessons: {
// 		title: string;
// 		parts: {
// 			heading: string;
// 			content: string;
// 			image: string[];
// 			more: string;
// 		}[];
// 	}[];
// };
type LessonPart = {
  heading: string;
  content: string;
  image?: string[];
  more?: string;
};

type Lesson = {
  title: string;
  parts: LessonPart[];
};

type Section = {
  name: string;
  lessons: Lesson[];
};



const sectionsData: Section[] = [
  {
    name: "Section 1",
    lessons: [
      {
        title: "Day 1",
        parts: [
          {
            heading: "Scales",
            content:
              "Learn the C major scale and practice ascending and descending.",
            image: [" ../src/assets/images/c-scale.png", "../src/assets/images/c-scale-sheet.png"],
            more: "Try playing slowly and increase speed gradually.",
          },
          {
            heading: "Chords",
            content: "Practice switching between: Am - Dm - Em - Am",
            image: ["../src/assets/images/chords-c-g.png"],
            more: "Focus on clean transitions between chords.",
          },
          {
            heading: "Song Practice",
            content: "Play 'Đàn gà con'",
            image: ["../src/assets/images/dan-ga-con-sheet.png"],
            more: "Sing along as you play for better rhythm.",
          },
        ],
      },
      {
        title: "Day 2",
        parts: [
          {
            heading: "Scales",
            content: "Practice the G major scale.",
            image: ["/images/scales-g-major.png"],
            more: "Use a metronome for even timing.",
          },
          {
            heading: "Chords",
            content: "Add D chord and practice transitions.",
            image: ["/images/chords-d.png"],
          },
          {
            heading: "Song Practice",
            content: "Play 'Row Row Row Your Boat' with C, G, and D chords.",
            more: "Try playing with a friend in a round.",
          },
        ],
      },
      {
        title: "Day 3",
        parts: [
          { heading: "Scales", content: "Review C and G major scales." },
          { heading: "Chords", content: "Introduce Em chord." },
          {
            heading: "Song Practice",
            content: "Play 'Mary Had a Little Lamb' with C, G, and Em.",
          },
        ],
      },
      {
        title: "Day 4",
        parts: [
          { heading: "Scales", content: "Practice D major scale." },
          { heading: "Chords", content: "Practice D and Em transitions." },
          {
            heading: "Song Practice",
            content: "Play 'Happy Birthday' with D, G, and Em.",
          },
        ],
      },
      {
        title: "Day 5",
        parts: [
          { heading: "Scales", content: "Combine C, G, and D major scales." },
          { heading: "Chords", content: "Review all chords learned so far." },
          {
            heading: "Song Practice",
            content: "Play 'Jingle Bells' with C, G, D, and Em.",
          },
        ],
      },
      {
        title: "Day 6",
        parts: [
          { heading: "Scales", content: "Practice scales with a metronome." },
          { heading: "Chords", content: "Introduce A minor chord." },
          {
            heading: "Song Practice",
            content: "Play 'Let It Be' intro with C, G, Am, and F.",
          },
        ],
      },
      {
        title: "Day 7",
        parts: [
          { heading: "Scales", content: "Review all scales." },
          {
            heading: "Chords",
            content: "Chord changes with strumming patterns.",
          },
          {
            heading: "Song Practice",
            content: "Play 'Stand By Me' with G, Em, C, and D.",
          },
        ],
      },
      {
        title: "Day 8",
        parts: [
          { heading: "Scales", content: "Test yourself on all scales." },
          { heading: "Chords", content: "Play all chords smoothly." },
          {
            heading: "Song Practice",
            content: "Perform your favorite song using learned chords.",
          },
        ],
      },
    ],
  },
  {
    name: "Section 2",
    lessons: Array.from({ length: 8 }, (_, i) => ({
      title: `Day ${i + 1}`,
      parts: [
        {
          heading: "Scales",
          content: `Section 2 - Day ${i + 1} Scales content.`,
          // image: "/images/section2-scales.png"
        },
        {
          heading: "Chords",
          content: `Section 2 - Day ${i + 1} Chords content.`,
        },
        {
          heading: "Song Practice",
          content: `Section 2 - Day ${i + 1} Song Practice content.`,
        },
      ],
    })),
  },
  {
    name: "Section 3",
    lessons: Array.from({ length: 8 }, (_, i) => ({
      title: `Day ${i + 1}`,
      parts: [
        {
          heading: "Scales",
          content: `Section 3 - Day ${i + 1} Scales content.`,
        },
        {
          heading: "Chords",
          content: `Section 3 - Day ${i + 1} Chords content.`,
        },
        {
          heading: "Song Practice",
          content: `Section 3 - Day ${i + 1} Song Practice content.`,
          more: "Challenge: Play with a backing track.",
        },
      ],
    })),
  },
];

export default sectionsData;