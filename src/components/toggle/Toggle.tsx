import styles from "./Toggle.module.css";

type ToggleSwitchProps = {
  label: string;
  defaultChecked: boolean;
  onChange: (isChecked: boolean) => void;
};

const ToggleSwitch = ({
  label,
  defaultChecked,
  onChange,
}: ToggleSwitchProps) => {
  const handleChange = () => {
    onChange && onChange(!defaultChecked);
  };

  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        checked={defaultChecked}
        onChange={handleChange}
        style={{ visibility: "hidden" }}
        id={label}
      />
      <label htmlFor={label} className={styles.toggleContainer}>
        <div className="relative" style={{ position: "relative" }}>
          <div
            className={styles.toggleInnerContainer}
            style={{
              backgroundColor: defaultChecked ? "green" : "#6B7280",
            }}
          ></div>
          <div
            className={styles.dot}
            style={{
              left: defaultChecked ? "1.8rem" : "0.25rem",
            }}
          ></div>
        </div>
        <div className={styles.text}>{label}</div>
      </label>
    </div>
  );
};

export default ToggleSwitch;
