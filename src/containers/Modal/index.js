import PropTypes from "prop-types";
import { useState } from "react";
import Icon from "../../components/Icon";
import "./style.scss";

const Modal = ({ opened, Content, children, onClose }) => {
  const [isOpened, setIsOpened] = useState(opened);

  const handleClose = () => {
    setIsOpened(false);
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  return (
    <>
      {children && typeof children === 'function' && children({ isOpened, setIsOpened })}
      {isOpened && (
        <div className="modal">
          <div className="content">
            {Content}
            <button
              type="button"
              data-testid="close-modal"
              onClick={handleClose}
            >
              <Icon name="close" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

Modal.defaultProps = {
  opened: false,
  Content: null,
  children: null,
  onClose: () => {},
};

Modal.propTypes = {
  opened: PropTypes.bool,
  Content: PropTypes.node,
  children: PropTypes.func,
  onClose: PropTypes.func,
};

export default Modal;
