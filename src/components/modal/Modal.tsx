import styles from "./Modal.module.css";

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: JSX.Element;
};

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  return (
    <div>
      {isOpen ? (
        <div className={styles.modal} onClick={onClose}>
          <div
            className={styles.modalContainer}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Modal;
