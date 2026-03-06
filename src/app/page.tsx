import Hero from "@/components/ui/Hero";
import TrackCard from "@/components/ui/TrackCard";
import { getLatestTracks, getFeaturedTrack } from "@/lib/audio";
import FeaturedTrackPlayer from "@/components/ui/FeaturedTrackPlayer";
import SectionHeader from "@/components/ui/SectionHeader";

export default function HomePage() {
  const latestTracks = getLatestTracks(4);
  const featuredTrack = getFeaturedTrack();

  return (
    <>
      <Hero />

      {/* Featured track */}
      <section className="relative mx-auto max-w-7xl px-6 py-20">
        <SectionHeader
          label="Featured"
          title="Primary Signal"
          href=""
        />
        <FeaturedTrackPlayer track={featuredTrack} />
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="h-px bg-linear-to-r from-transparent via-cyber-cyan/20 to-transparent" />
      </div>

      {/* Latest tracks */}
      <section className="relative mx-auto max-w-7xl px-6 py-20">
        <SectionHeader
          label="Recent"
          title="Latest Transmissions"
          href="/music"
          linkText="View All"
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {latestTracks.map((track, i) => (
            <TrackCard key={track.id} track={track} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
