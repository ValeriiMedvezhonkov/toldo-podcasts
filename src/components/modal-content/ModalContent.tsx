import { ReactComponent as Cross } from "assets/images/cross.svg";
import styles from "./ModalContent.module.css";
import ToggleSwitch from "components/toggle/Toggle";
import { useAudio } from "components/context/AppProvider";
import AudioMp3 from "components/audio/AudioMp3/AudioMp3";
import AudioWebm from "components/audio/AudioWebm/AudioWebm";

export type ModalContentProps = {
  handleClose: () => void;
};

const ModalContent = ({ handleClose }: ModalContentProps) => {
  const { isMp3, setIsMp3 } = useAudio();

  return (
    <>
      <div className={styles.cross} onClick={handleClose}>
        <Cross style={{ cursor: "pointer" }} />
      </div>
      <div className={styles.modalContainer}>
        <h1>Send a voice message to Dobré ráno | Denný podcast denníka SME</h1>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <ToggleSwitch
            label="MP3 (Bonus)"
            defaultChecked={isMp3}
            onChange={setIsMp3}
          />
        </div>
        {isMp3 ? <AudioMp3 /> : <AudioWebm />}
      </div>
    </>
  );
};

export default ModalContent;
