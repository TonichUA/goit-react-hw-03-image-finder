import React from 'react';
import { StyledImageGallery } from './ImageGalleryStyleds';
import { ImageGalleryItem } from './ImageGalleryItem';

const ImageGallery = ({ images, openModal }) => (
  <StyledImageGallery className="gallery">
    {images.map(image => (
      <ImageGalleryItem
        key={image.id}
        id={image.id}
        src={image.webformatURL}
        alt={image.tags}
        openModal={openModal}
      />
    ))}
  </StyledImageGallery>
);

export { ImageGallery };
