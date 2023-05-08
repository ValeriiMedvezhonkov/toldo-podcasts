import styles from "./Loader.module.css";
import Loader from "components/Loader/Loader";

const SpinnerContainer = () => {
  return (
    <div className={styles.spinnerContainer}>
      <Loader />
    </div>
  );
};

export default SpinnerContainer;
