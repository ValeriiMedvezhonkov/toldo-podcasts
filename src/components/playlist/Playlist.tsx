import styles from "./Playlist.module.css";
import PlayListCurrentItem from "components/playlist/playlist-current/PlayListCurrentItem";
import PlaylistFeed from "components/playlist/playlist-feed/PlaylistFeed";

const Playlist = () => {
  return (
    <div className={styles.playlist}>
      <PlayListCurrentItem />
      <PlaylistFeed />
    </div>
  );
};

export default Playlist;
