import styles from "./PlaylistCurrentItem.module.css";
import { ReactComponent as Waves } from "assets/images/waves.svg";
import { ReactComponent as Play } from "assets/images/play.svg";
import { ReactComponent as Pause } from "assets/images/pause.svg";
import { ReactComponent as WavesActive } from "assets/images/waves-active.svg";
import dayjs from "dayjs";
import { useAudio } from "components/context/AppProvider";
import formatTime from "../../../utils/formatTime";

const PlayListCurrentItem = () => {
  const { currentTrack, handlePlayTrack, currentTime, progressBarRef } =
    useAudio();

  return (
    <div className={styles.playlistMain}>
      <div>
        <img
          alt="Currently playing episode"
          src={currentTrack?.image ?? ""}
          className={styles.currentPlayImage}
        />
      </div>
      <div className={styles.plMain}>
        <div className={styles.plMainData}>
          <div data-grid="logo" className={styles.logo}>
            <button
              className={styles.logoButton}
              aria-label="Play audio"
              onClick={() => handlePlayTrack(currentTrack)}
            >
              {currentTrack?.trackIsPlaying ? <WavesActive /> : <Waves />}
            </button>
          </div>
          <div data-grid="title" className={styles.title}>
            <h4 data-encore-id="type" className={styles.titleType}>
              <div className={styles["cut-title-text"]}>
                {currentTrack?.title}
              </div>
            </h4>
          </div>
          <div data-grid="byline" className={styles.byline}>
            <h3 data-encore-id="type" className={styles.bylineType}>
              Dobré ráno | Denný podcast denníka SME
              <span className={styles.middleDot}>
                {dayjs(currentTrack?.pubDate).format("MMM DD, YYYY")}
              </span>
            </h3>
          </div>
          <div data-grid="play" className={styles.play}>
            <button
              aria-label="Play icon"
              className={styles.playButton}
              onClick={() => handlePlayTrack(currentTrack)}
            >
              <span className={styles.playContainer}>
                {currentTrack?.trackIsPlaying ? <Pause /> : <Play />}
              </span>
              <span className="ButtonFocus-sc-2hq6ey-0 fCqSBB"></span>
            </button>
          </div>
          <div data-grid="ellapsed" className={styles.ellapsed}>
            <span data-encore-id="type" className={styles.ellapsedType}>
              <span>{formatTime(currentTime)}</span>
            </span>
          </div>
          <div data-grid="duration" className={styles.duration}>
            <span data-encore-id="type" className={styles.durationType}>
              {currentTrack?.duration}
            </span>
          </div>
        </div>
        <button aria-label="Audio seek bar" className={styles.audioBar}>
          <input
            type="range"
            ref={progressBarRef}
            defaultValue="0"
            className={styles.progressBar}
          />
        </button>
      </div>
    </div>
  );
};

export default PlayListCurrentItem;
