import styles from "./App.module.css";
import { useEffect } from "react";
import Header from "components/header/Header";
import PageWrapper from "components/layouts/PageWrapper/PageWrapper";
import HeaderCard from "components/cards/HeaderCard/HeaderCard";
import AvailableOn from "components/availableOn/AvailableOn";
import availableOnItems from "../utils/AvailableOnLinks";
import Playlist from "components/playlist/Playlist";
import SpinnerContainer from "components/Loader/SpinnerContainer";
import { useAudio } from "components/context/AppProvider";

export type RSSItem = {
  id: string | null | undefined;
  title: string | null | undefined;
  description: string | null | undefined;
  pubDate: string | null | undefined;
  summary: string | null;
  duration: string | null;
  image: string | null | undefined;
  enclosure: {
    url: string | null | undefined;
  };
  trackIsPlaying: boolean;
};

export type RSSFeed = {
  title?: string | null;
  imageUrl?: string | null;
  items: RSSItem[];
};

const App = () => {
  const { feed, setFeed, isLoading, setIsLoading, setCurrentTrack } =
    useAudio();

  useEffect(() => {
    setIsLoading(true);
    getFeed().then((feed) => {
      setFeed(feed);
      setCurrentTrack(feed.items[0]);
      setIsLoading(false);
    });
  }, []);

  const getFeed = async (): Promise<RSSFeed> => {
    const feedText: string = await fetch(
      "https://anchor.fm/s/8a651488/podcast/rss"
    ).then((r) => r.text());

    const parser: DOMParser = new DOMParser();
    const xmlDoc: Document = parser.parseFromString(feedText, "text/xml");

    const title = xmlDoc.querySelector("title")?.textContent;
    const imageUrl = xmlDoc.querySelector("url")?.textContent;

    const items: RSSItem[] = [];

    const xmlItems = Array.from(xmlDoc.querySelectorAll("item"));

    xmlItems.forEach((item: Element) => {
      const enclosureAttributes = item.querySelector("enclosure")?.attributes;
      const imageAttributes =
        item.getElementsByTagName("itunes:image")[0]?.attributes;

      const rssItem: RSSItem = {
        id: item.querySelector("guid")?.textContent,
        title: item.querySelector("title")?.textContent,
        description: item.querySelector("description")?.textContent,
        pubDate: item.querySelector("pubDate")?.textContent,
        summary: item.getElementsByTagName("itunes:summary")[0]?.textContent,
        image: imageAttributes?.getNamedItem("href")?.textContent,
        duration: item.getElementsByTagName("itunes:duration")[0]?.textContent,
        enclosure: {
          url: enclosureAttributes?.getNamedItem("url")?.textContent,
        },
        trackIsPlaying: false,
      };
      items.push(rssItem);
    });

    return {
      title: title,
      imageUrl: imageUrl,
      items: items,
    };
  };

  return (
    <>
      <Header />
      <PageWrapper>
        <>
          {isLoading && <SpinnerContainer />}
          {!isLoading && feed && (
            <div>
              <HeaderCard title={feed?.title} />
              <div className={styles.playlistContainer}>
                <AvailableOn availableOnItems={availableOnItems} />
                <Playlist />
              </div>
            </div>
          )}
        </>
      </PageWrapper>
    </>
  );
};

export default App;
