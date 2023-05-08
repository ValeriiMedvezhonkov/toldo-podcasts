import styles from "./button.module.css";
import React from "react";
import classnames from "classnames";
import { ReactComponent as Play } from "assets/images/play.svg";
import { ReactComponent as Pause } from "assets/images/pause.svg";

export type ButtonProps = {
  download?: boolean;
  disabled?: boolean;
  type?: "play" | "pause";
  children: React.ReactNode;
  onClick?: () => void;
};

const Button = ({
  download,
  children,
  onClick,
  disabled = false,
  type,
}: ButtonProps) => {
  return (
    <button
      className={classnames(styles.button, {
        [styles.disabled]: disabled,
      })}
      onClick={onClick}
      disabled={disabled}
    >
      {download && (
        <svg
          className={styles["download-icon"]}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </svg>
      )}
      <div style={{ marginRight: "10px" }}>
        {type === "play" && <Pause />}
        {type === "pause" && <Play />}
      </div>
      <span>{children}</span>
    </button>
  );
};

export default Button;
