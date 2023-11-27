import React from 'react';
import { StyledImageGallery } from './ImageGalleryStyleds';
import { ImageGalleryItem } from './ImageGalleryItem';

export class ImageGallery extends React.Component {
  state = {};

  openModal = image => {
    this.props.openModal(image);
  };

  render() {
    const { images } = this.props;

    return (
      <StyledImageGallery className="gallery">
        {images.map(image => (
          <ImageGalleryItem
            key={image.id}
            id={image.id}
            src={image.webformatURL}
            alt={image.tags}
            onClick={() => this.openModal(image)}
          />
        ))}
      </StyledImageGallery>
    );
  }
}
