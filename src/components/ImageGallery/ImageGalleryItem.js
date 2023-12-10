import React from 'react';
import { StyledImageGalleryItem, Image } from './ImageGalleryItemStyleds';
const ImageGalleryItem = ({ id, src, alt, openModal }) => {
  return (
    <StyledImageGalleryItem
      className="gallery-item"
      onClick={() => openModal({ id, src, alt })}
    >
      <Image src={src} alt={alt} />
    </StyledImageGalleryItem>
  );
};

export { ImageGalleryItem };
