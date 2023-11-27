import React, { Component } from 'react';
import { Button } from './Button';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { queryImg } from './QueryImg';

import { Bars } from 'react-loader-spinner';
import styled from 'styled-components';

const StyledApp = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  padding-bottom: 24px;
`;

export class App extends Component {
  state = {
    query: '',
    images: [],
    currentPage: 1,
    isLoading: false,
    selectedImage: null,
    totalHits: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, currentPage } = this.state;

    if (prevState.query !== query || prevState.currentPage !== currentPage) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    const { query, currentPage } = this.state;

    try {
      this.setState({ isLoading: true });

      const response = await queryImg(query, currentPage);

      const { hits, totalHits } = response;

      if (hits && totalHits !== undefined) {
        this.setState(prevState => ({
          images: currentPage === 1 ? hits : [...prevState.images, ...hits],
          totalHits: totalHits,
        }));
      } else {
        console.error('Недійсні дані від Pixabay API:', response);
      }
    } catch (error) {
      console.error('Помилка під час отримання зображень:', error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSearch = newQuery => {
    this.setState({ query: newQuery, images: [], currentPage: 1 });
  };

  loadMore = () => {
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
  };

  render() {
    const { images, isLoading, selectedImage, totalHits } = this.state;

    return (
      <StyledApp className="App">
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery
          images={images}
          openModal={image => this.setState({ selectedImage: image })}
        />
        {isLoading && (
          <Bars
            type="Oval"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000}
          />
        )}
        {images.length > 0 && !isLoading && totalHits > images.length && (
          <Button onLoadMore={this.loadMore} show={true} />
        )}
        {selectedImage && (
          <Modal
            image={selectedImage.largeImageURL}
            onClose={() => this.setState({ selectedImage: null })}
          />
        )}
      </StyledApp>
    );
  }
}
