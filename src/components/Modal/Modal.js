import React from 'react';
import { ModalWrapper } from './ModalStyleds';

const Modal = ({ isOpen, onRequestClose, selectedImage }) => {
  return (
    <div>
      {isOpen && (
        <div>
          <div
            onClick={onRequestClose}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(0,0,0,0.5)',
            }}
          ></div>
          <ModalWrapper>
            {selectedImage && (
              <img src={selectedImage.src} alt={selectedImage.alt} />
            )}
          </ModalWrapper>
        </div>
      )}
    </div>
  );
};

export default Modal;
