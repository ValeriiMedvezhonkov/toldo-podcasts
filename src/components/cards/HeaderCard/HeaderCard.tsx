import styles from "./HeaderCard.module.css";
import { useState } from "react";
import Modal from "components/modal/Modal";
import ModalContent from "components/modal-content/ModalContent";

export type HeaderCardProps = {
  title?: string | null;
};

const HeaderCard = ({ title }: HeaderCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <div className={styles.header}>
      {isOpen && (
        <Modal onClose={handleClose} isOpen={isOpen}>
          <ModalContent handleClose={handleClose} />
        </Modal>
      )}
      <div className={styles.container}>
        <div>
          <img
            alt="Dobré ráno | Denný podcast denníka SME"
            src="https://s3-us-west-2.amazonaws.com/anchor-generated-image-bank/staging/podcast_uploaded_nologo400/23118802/6bf8d304b8a7f139.png"
            className={styles.headerImage}
          />
        </div>
        <div className={styles.headerDescription}>
          <h1 className={styles.headerTitle}>{title}</h1>
          <h2 className={styles.headerBySme}>By SME.sk</h2>
          <div>
            <div className={styles.headerlinksBlock}>
              <span className={styles.headerDescriptionTitle}>
                Denný spravodajský podcast na Slovensku. Pondelok až piatok,
                každé ráno nový diel - rozhovory s reportérmi, komentátormi a
                hosťami denníka SME.
              </span>
              <div className={styles.headerButtonsContainer}>
                <a
                  className={styles.headerButton}
                  href="https://open.spotify.com/show/2slCyrl7Ir3oU38eIXCURX"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-encore-id="buttonSecondary"
                >
                  <span aria-hidden="true" className={styles.headerButtonIcon}>
                    <svg
                      role="img"
                      height="16"
                      width="16"
                      aria-hidden="true"
                      viewBox="0 0 16 16"
                      className=""
                    >
                      <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.669 11.539a.498.498 0 0 1-.686.166c-1.878-1.148-4.243-1.408-7.028-.772a.499.499 0 0 1-.222-.972c3.048-.696 5.662-.396 7.77.892a.5.5 0 0 1 .166.686zm.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.322-5.428-1.705-7.972-.932a.624.624 0 1 1-.362-1.194c2.905-.882 6.517-.455 8.987 1.063a.624.624 0 0 1 .205.858zm.084-2.269C10.153 5.561 5.9 5.42 3.438 6.167a.748.748 0 1 1-.434-1.432c2.826-.857 7.523-.692 10.492 1.07a.748.748 0 0 1-.764 1.287z"></path>
                    </svg>
                  </span>
                  Listen on Spotify
                </a>
                <button
                  className={styles.headerButton}
                  data-encore-id="buttonSecondary"
                  onClick={handleOpen}
                >
                  <span aria-hidden="true" className={styles.headerButtonIcon}>
                    <svg
                      role="img"
                      height="16"
                      width="16"
                      aria-hidden="true"
                      viewBox="0 0 16 16"
                      data-encore-id="icon"
                      className="Svg-sc-ytk21e-0 dmMoAF"
                    >
                      <path d="M4.2 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM9 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm2.8 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path>
                      <path d="M1.75 0A1.75 1.75 0 0 0 0 1.75v8.5C0 11.216.784 12 1.75 12h2.664L8 15.585 11.585 12h2.665A1.75 1.75 0 0 0 16 10.25v-8.5A1.75 1.75 0 0 0 14.25 0H1.75zM1.5 1.75a.25.25 0 0 1 .25-.25h12.5a.25.25 0 0 1 .25.25v8.5a.25.25 0 0 1-.25.25h-3.286L8 13.464 5.036 10.5H1.75a.25.25 0 0 1-.25-.25v-8.5z"></path>
                    </svg>
                  </span>
                  Send voice message
                </button>
              </div>
              <div className={styles.headerSite}>
                <a
                  href="https://sme.sk/dobrerano"
                  rel="noopener noreferrer ugc"
                  target="_blank"
                  title="Website"
                >
                  <svg
                    role="img"
                    height="24"
                    width="24"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.208 23H12C5.925 23 1 18.075 1 12S5.925 1 12 1a11.336 11.336 0 0 1 .383.007C18.28 1.208 22.999 6.053 22.999 12s-4.72 10.792-10.617 10.994a2.304 2.304 0 0 1-.174.006zm-.591-19.577c-.316.381-.644.993-.94 1.836-.513 1.466-.869 3.47-.95 5.741h4.963c-.081-2.27-.437-4.275-.95-5.74-.296-.844-.624-1.456-.94-1.837-.273-.33-.462-.405-.553-.42l-.066-.001c-.086.01-.28.077-.564.421zM7.725 11c.083-2.454.466-4.69 1.065-6.401.146-.418.308-.814.488-1.18A9.009 9.009 0 0 0 3.054 11h4.671zm-4.671 2a9.009 9.009 0 0 0 6.224 7.581c-.18-.366-.342-.762-.488-1.18-.6-1.711-.982-3.947-1.065-6.401H3.054zm6.672 0c.082 2.27.438 4.275.951 5.74.296.844.624 1.456.94 1.837.284.343.478.41.564.421l.066-.001c.09-.015.28-.09.553-.42.316-.381.644-.993.94-1.836.513-1.466.869-3.47.95-5.741H9.726zm6.966 0c-.083 2.454-.466 4.69-1.065 6.401-.123.352-.257.688-.404 1.004A9.009 9.009 0 0 0 20.944 13h-4.252zm4.252-2a9.009 9.009 0 0 0-5.72-7.405c.146.316.28.652.403 1.004.6 1.711.982 3.947 1.065 6.401h4.252z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderCard;
