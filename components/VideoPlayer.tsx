"use client";

import Image from "next/image";
import { useState } from "react";

type VideoPlayerProps = {
  title: string;
  /** Self-hosted video, e.g. "/videos/how-it-works.mp4" (put the file in /public/videos) */
  src?: string;
  /** Or a YouTube video id, e.g. "dQw4w9WgXcQ" (the part after ?v= in the link) */
  youtubeId?: string;
  /** Optional cover image, e.g. "/images/how-it-works/poster.jpg" */
  poster?: string;
};

function PlayIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7L8 5Z" />
    </svg>
  );
}

export default function VideoPlayer({ title, src, youtubeId, poster }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);

  const frame =
    "relative aspect-video w-full overflow-hidden rounded-2xl bg-[#0B3D22] shadow-xl shadow-black/15";

  // 1) Self-hosted video: native player
  if (src) {
    return (
      <div className={frame}>
        <video
          className="h-full w-full object-cover"
          controls
          playsInline
          preload="metadata"
          poster={poster}
          aria-label={title}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  // 2) YouTube: click-to-load, so nothing from YouTube loads until the visitor presses play
  if (youtubeId) {
    return (
      <div className={frame}>
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play video: ${title}`}
            className="group absolute inset-0 flex items-center justify-center focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#17B917]"
          >
            {poster ? (
              <Image src={poster} alt="" fill sizes="(min-width: 1024px) 896px, 100vw" className="object-cover" />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
            <span aria-hidden="true" className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/35" />
            <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[#17B917] pl-1 text-white shadow-lg transition-transform group-hover:scale-110 sm:h-24 sm:w-24">
              <PlayIcon />
            </span>
          </button>
        )}
      </div>
    );
  }

  // 3) No video added yet
  return (
    <div className={`${frame} flex items-center justify-center`}>
      {poster && <Image src={poster} alt="" fill sizes="100vw" className="object-cover opacity-60" />}
      <div className="relative z-10 px-6 text-center text-white">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/15 pl-1">
          <PlayIcon />
        </span>
        <p className="mt-4 text-lg font-semibold">Video coming soon</p>
      </div>
    </div>
  );
}