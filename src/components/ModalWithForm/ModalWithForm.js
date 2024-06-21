import "./ModalWithForm.css";

const ModalWithForm = ({
  children,
  submitButtonText,
  switchButtonText,
  title,
  onClose,
  name,
  isOpen,
  onSubmit,
  onClick,
  isEnable,
}) => {
  return (
    <div className={`modal modal_type_${name}`}>
      <div className="modal__container">
        <button
          className="modal__close-button"
          type="button"
          onClick={onClose}
        />
        <h3 className="modal__title">{title}</h3>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <div className="modal__buttons">
            <button
              className="modal__add-button"
              type="submit"
              disabled={!isEnable}
            >
              {submitButtonText}
            </button>
            {switchButtonText && (
              <button
                className="modal__switch-button"
                type="button"
                onClick={onClick}
              >
                {switchButtonText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
