import AboutClient from "./AboutClient";

export const metadata = {
  title: "About | Jr Prod",
  description: "Learn more about Jr Prod - independent beat producer.",
};

const influences = [
  "Metro Boomin", "Tame Impala", "J Dilla", "Nujabes",
  "Travis Scott", "Frank Ocean", "Kanye West", "The Weeknd",
];

const genres = ["Lo-Fi", "Trap", "Hip-Hop", "R&B", "Drill", "Ambient"];

const bioSections = [
  {
    label: "Origin",
    text: "Independent beat producer and sound designer operating from the underground music scene. Creating beats that blend the raw energy of trap with the atmospheric textures of lo-fi and the groove of classic hip-hop.",
  },
  {
    label: "Evolution",
    text: "With years of experience behind the boards, Jr Prod has developed a signature sound that bridges genres and pushes boundaries. Every beat tells a story, every melody carries emotion.",
  },
  {
    label: "Mission",
    text: "Make music that moves people. Whether it ends up in a late-night studio session, a viral video, or a sold-out show — the goal is always the same: create something real.",
  },
];

export default function AboutPage() {
  return (
    <AboutClient
      influences={influences}
      genres={genres}
      bioSections={bioSections}
    />
  );
}
