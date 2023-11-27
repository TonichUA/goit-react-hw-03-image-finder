import React, { Component } from 'react';
import { customStyles, ModalWrapper } from './ModalStyleds';
import ModalComponent from 'react-modal';

ModalComponent.setAppElement('#root');

export class Modal extends Component {
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
      <ModalComponent
        isOpen={isModalOpen}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel="Image Modal"
      >
        <ModalWrapper>
          {selectedImage && <img src={selectedImage} alt="modal" />}
        </ModalWrapper>
      </ModalComponent>
    );
  }
}
