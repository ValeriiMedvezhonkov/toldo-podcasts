import styles from "./AvailableOn.module.css";

export type AvailableOnProps = {
  href: string;
  imgSrc: string;
};

export type AvailableOnItemsProps = {
  availableOnItems: AvailableOnProps[];
};

const AvailableOn = ({ availableOnItems }: AvailableOnItemsProps) => {
  const renderItems = () => {
    return availableOnItems.map(({ href, imgSrc }, index) => {
      return (
        <a href={href} target="_blank" key={index} rel="noreferrer">
          <img src={imgSrc} alt="Apple Podcasts Logo" height="28" width="28" />
        </a>
      );
    });
  };

  return (
    <div className={styles.availableOn}>
      <h5 className={styles.availableOnTitle}>Available on</h5>
      <div className={styles.availableOnButtons}>{renderItems()}</div>
    </div>
  );
};

export default AvailableOn;
