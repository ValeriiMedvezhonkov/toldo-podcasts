import styles from "./PlaylistFeed.module.css";
import { RSSItem } from "app/App";
import PlaylistItem from "components/playlist/playlist-item/PlaylistItem";
import { useAudio } from "components/context/AppProvider";
import { SyntheticEvent } from "react";

const PlaylistFeed = () => {
  const {
    feed,
    currentTrack,
    audioRef,
    setCurrentTime,
    progressBarRef,
    setDuration,
    duration,
  } = useAudio();

  const onLoadedMetadata = () => {
    const seconds = audioRef?.current?.duration ?? 0;
    setDuration(seconds);
    if (progressBarRef.current) progressBarRef.current.max = String(seconds);
  };

  const handleTimeUpdate = (event: SyntheticEvent<HTMLAudioElement>) => {
    const target = event.target as HTMLAudioElement;
    setCurrentTime(target.currentTime);
    if (progressBarRef.current) {
      progressBarRef.current.value = String(target.currentTime);
      progressBarRef?.current?.style.setProperty(
        "--range-progress",
        `${
          ((progressBarRef?.current?.value as unknown as number) / duration) *
          100
        }%`
      );
    }
  };

  return (
    <div className={styles.feed}>
      <audio
        src={currentTrack.enclosure.url ?? ""}
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
      />
      {feed?.items.map((item: RSSItem, index: number) => {
        return <PlaylistItem item={item} key={index} />;
      })}
    </div>
  );
};

export default PlaylistFeed;
