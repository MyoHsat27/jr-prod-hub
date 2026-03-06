export interface Track {
  id: string;
  title: string;
  genre: string;
  cover: string;
  audioUrl: string;
  releaseDate: string;
  duration?: string;
}

export interface TracksData {
  tracks: Track[];
}
