import PropTypes from "prop-types";

const Modal = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null; // Если модальное окно закрыто, не отображаем его.

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div className="modal-body">
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
};

// Валидация пропсов для модального окна
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
};

export default Modal;
