import React, { Component } from 'react';
import { customStyles, ModalWrapper } from './ModalStyleds';

class Modal extends Component {
  state = {
    selectedImage: null,
    isModalOpen: false,
  };

  openModal = image => {
    if (!this.state.isModalOpen) {
      this.setState({ selectedImage: image, isModalOpen: true });
      document.addEventListener('keydown', this.handleKeyDown);
    }
  };

  closeModal = () => {
    if (this.state.isModalOpen) {
      this.setState({ selectedImage: null, isModalOpen: false });
      document.removeEventListener('keydown', this.handleKeyDown);
    }
  };

  handleKeyDown = e => {
    if (e.key === 'Escape') {
      this.closeModal();
    }
  };

  render() {
    const { selectedImage, isModalOpen } = this.state;

    return (
      <div>
        {isModalOpen && (
          <div>
            <div
              onClick={this.closeModal}
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
  }
}

export default Modal;
