import React, {
  createContext,
  ReactNode,
  useContext,
  useRef,
  useState,
} from "react";
import { RSSFeed, RSSItem } from "app/App";

export interface AppContextProps {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isMp3: boolean;
  setIsMp3: React.Dispatch<React.SetStateAction<boolean>>;
  feed?: RSSFeed;
  setFeed: React.Dispatch<React.SetStateAction<RSSFeed | undefined>>;
  currentTrack: RSSItem;
  setCurrentTrack: React.Dispatch<React.SetStateAction<RSSItem>>;
  currentTime: number;
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>;

  duration: number;
  setDuration: React.Dispatch<React.SetStateAction<number>>;

  handlePlayTrack(track: RSSItem): void;
  audioRef: React.RefObject<HTMLAudioElement>;
  progressBarRef: React.RefObject<HTMLInputElement>;
}

export const AppContext = createContext<AppContextProps>({} as AppContextProps);

type AppProviderProp = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProp) => {
  const [feed, setFeed] = useState<RSSFeed>();
  const [currentTrack, setCurrentTrack] = useState<RSSItem>({} as RSSItem);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMp3, setIsMp3] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>({} as HTMLAudioElement);
  const progressBarRef = useRef<HTMLInputElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handlePlayTrack = (track: RSSItem) => {
    if (currentTrack?.id === track.id) {
      if (!currentTrack.trackIsPlaying) {
        audioRef.current?.play().then();
      } else {
        audioRef.current?.pause();
      }
      setCurrentTrack((prevState) => {
        return { ...prevState, trackIsPlaying: !prevState.trackIsPlaying };
      });
    } else {
      setCurrentTrack({
        ...track,
        trackIsPlaying: true,
      });

      setTimeout(() => {
        audioRef.current?.play().then();
      }, 0);
    }
  };

  return (
    <AppContext.Provider
      value={{
        isLoading,
        setIsLoading,
        isMp3,
        setIsMp3,
        feed,
        setFeed,
        currentTrack,
        setCurrentTrack,
        handlePlayTrack,
        audioRef,
        progressBarRef,
        currentTime,
        setCurrentTime,
        duration,
        setDuration,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAudio = () => {
  const {
    isLoading,
    setIsLoading,
    isMp3,
    setIsMp3,
    feed,
    setFeed,
    currentTrack,
    setCurrentTrack,
    handlePlayTrack,
    audioRef,
    progressBarRef,
    currentTime,
    setCurrentTime,
    duration,
    setDuration,
  } = useContext(AppContext);

  return {
    isLoading,
    setIsLoading,
    isMp3,
    setIsMp3,
    feed,
    setFeed,
    currentTrack,
    setCurrentTrack,
    handlePlayTrack,
    audioRef,
    progressBarRef,
    currentTime,
    setCurrentTime,
    duration,
    setDuration,
  };
};
