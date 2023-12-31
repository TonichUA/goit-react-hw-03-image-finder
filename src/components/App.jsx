import React, { Component } from 'react';
import { Bars } from 'react-loader-spinner';

import { StyledApp } from './AppStyleds';

import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button';
import { queryImg } from './QueryImg';
import Modal from '../components/Modal/Modal';

class App extends Component {
  state = {
    query: '',
    images: [],
    currentPage: 1,
    isLoading: false,
    selectedImage: null,
    totalHits: null,
    isModalOpen: false,
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
          images: [...prevState.images, ...hits],
          totalHits,
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

  openModal = image => {
    this.setState({ selectedImage: image, isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ selectedImage: null, isModalOpen: false });
  };

  render() {
    const { images, isLoading, selectedImage, totalHits, isModalOpen } =
      this.state;

    return (
      <StyledApp className="App">
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery images={images} openModal={this.openModal} />

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
        <Modal
          isOpen={isModalOpen}
          onRequestClose={this.closeModal}
          selectedImage={selectedImage}
        />
      </StyledApp>
    );
  }
}

export default App;
