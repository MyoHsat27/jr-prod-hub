export interface Track {
  id: string;
  title: string;
  genre: string;
  cover: string;
  audioUrl: string;
  releaseDate: string;
  duration?: string;
  featured?: boolean;
}

export interface TracksData {
  tracks: Track[];
}

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  visible: boolean;
}

export interface SocialsData {
  socials: SocialLink[];
}
