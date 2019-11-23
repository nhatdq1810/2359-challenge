import React, { useState } from 'react';
import { debounce } from 'lodash';
import styles from './Home.module.scss';
import Gallery from '../components/Gallery';
import Search from './home/Search';

const fetchImages = async (searchQuery, setGallery) => {
  const response = await fetch(`http://api.giphy.com/v1/gifs/search?api_key=E4ChLnZqoVvB0fZXoi3DJjJqSQE2dp07&limit=8&q=${searchQuery}`);
  if (response.status === 200) {
    const result = await response.json();
    setGallery(result.data);
  }
};

const debounceFetchImages = debounce(fetchImages, 500);

const onSearch = (setSearchQuery, setGallery) => (event) => {
  const value = event.target.value;
  setSearchQuery(value);

  if (value) {
    debounceFetchImages(value, setGallery);
  }
}

const likeImage = (setFavouriteImages) => (imageId) => () => {
  setFavouriteImages(oldFavouriteImages => oldFavouriteImages.concat([imageId]));
}

function Home({ favouriteImages, setFavouriteImages }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [gallery, setGallery] = useState([]);

  return (
    <div className={styles.page}>
      <Search searchQuery={searchQuery} onSearch={onSearch(setSearchQuery, setGallery)} />
      <Gallery
        gallery={gallery}
        favouriteImages={favouriteImages}
        likeImage={likeImage(setFavouriteImages)}
      />
    </div>
  );
}

export default Home;
