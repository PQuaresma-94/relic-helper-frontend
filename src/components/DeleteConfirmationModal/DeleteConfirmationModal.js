import "./DeleteConfirmationModal.css";

const DeleteConfirmationModal = ({ name, onClose, onConfirmation }) => {
  return (
    <div className={`modal modal_type_${name}`}>
      <div className="modal__container delete">
        <button
          className="modal__close-button"
          type="button"
          onClick={onClose}
        />
        <div className="delete__modal">
          <div className="delete__modal-header">
            <div>Are you sure you want to delete this team?</div>
            <div>This action is irreversible.</div>
          </div>
          <div className="delete__modal-buttons">
            <button
              className="delete__modal-confirm-button"
              type="button"
              onClick={onConfirmation}
            >
              Yes, delete team
            </button>
            <button
              className="delete__modal-cancel-button"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
