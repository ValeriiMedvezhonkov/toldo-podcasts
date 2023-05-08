import { useState } from "react";
import dayjs from "dayjs";
import parse from "html-react-parser";
import classnames from "classnames";

import { ReactComponent as PlayItem } from "assets/images/play-item.svg";
import { ReactComponent as PauseItem } from "assets/images/pause.svg";
import { RSSItem } from "app/App";
import styles from "./PlaylistItem.module.css";
import { useAudio } from "components/context/AppProvider";

export type PlaylistItemProps = {
  item: RSSItem;
};

const PlaylistItem = ({ item }: PlaylistItemProps) => {
  const [expanded, setExpanded] = useState(false);
  const { currentTrack, handlePlayTrack } = useAudio();

  const toggleExpand = () => {
    setExpanded((prevState) => !prevState);
  };

  return item && item.id && item.image ? (
    <div
      className={classnames(styles.container, {
        [styles["is-playing"]]:
          currentTrack?.id === item.id && currentTrack?.trackIsPlaying,
      })}
    >
      <div style={{display: 'flex'}}>
        <div className={styles.playImg}>
          <img src={item?.image} alt="Play icon" className={styles.playImgIcon} />
          <div className={styles.playButtonContainer}>
            <button
              aria-label="Play icon"
              className={styles.playCircle}
              onClick={() => handlePlayTrack(item)}
            >
              <span className={styles.playWrapper}>
                <span aria-hidden="true" className={styles.playCircleButton}>
                  {currentTrack?.id === item.id &&
                  currentTrack?.trackIsPlaying ? (
                    <PauseItem />
                  ) : (
                    <PlayItem />
                  )}
                </span>
              </span>
            </button>
          </div>
        </div>
        <div className={classnames(styles.dateTime,styles.dateTimeResponsiveMobile)}>
          <span className={styles.dateTimeSpan}>
            {dayjs(item.pubDate).format("MMM DD, YYYY")}
          </span>
            <span className={styles.dateTimeSpan}>{item.duration}</span>
          </div>
        </div>
      <div className={styles.accordionContainer}>
        <h4 className={styles.title}>
          <div className={styles["cut-title-text"]}>{item.title}</div>
        </h4>
        <div className={styles.accordionWrapper}>
          <div
            className={classnames(styles.accordionData, {
              [styles["line-expanded"]]: expanded,
              [styles["line-not-expanded"]]: !expanded,
            })}
          >
            {parse(item.summary as string)}
          </div>
          <button className={styles.expand} onClick={toggleExpand}>
            {expanded ? "See less" : "See more"}
          </button>
        </div>
      </div>
      <div className={classnames(styles.dateTime, styles.dateTimeResponsiveDesktop)}>
        <span className={styles.dateTimeSpan}>
          {dayjs(item.pubDate).format("MMM DD, YYYY")}
        </span>
        <span className={styles.dateTimeSpan}>{item.duration}</span>
      </div>
    </div>
  ) : null;
};

export default PlaylistItem;
