import styles from "@pages/auth/styles/modal.module.scss"
import { ModalProps } from "@helpers/types"
import Modal from "react-modal"

Modal.setAppElement("#root")

export const DeleteModal: React.FC<ModalProps> = ({ isOpen, setIsOpen, onDelete }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(false)}
            className={styles.modalContainer}
        >
            <div className={styles.modal}>
                <div className={styles.modalHeader}>Confirm Deletion</div>
                <p className={styles.modalBody}>Are you sure you want to delete this post?</p>
                <div className={styles.modalActions}>
                    <button
                        type="button"
                        onClick={onDelete}
                        className={styles.confirmButton}
                    >
                        Yes
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className={styles.cancelButton}
                    >
                        No
                    </button>
                </div>
            </div>
        </Modal>
    )
}
