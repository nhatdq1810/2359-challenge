import React, { useState } from 'react';
import styles from './Home.module.scss';
import Gallery from '../components/Gallery';
import Search from './home/Search';

const fetchImages = async (searchQuery, setGallery, setIsLoading) => {
  setIsLoading(true);

  const response = await fetch(`http://api.giphy.com/v1/gifs/search?api_key=E4ChLnZqoVvB0fZXoi3DJjJqSQE2dp07&limit=8&q=${searchQuery}`);
  if (response.status === 200) {
    const result = await response.json();
    setGallery(result.data);
  }

  setIsLoading(false);
};

let fetchImagesToken = null;

const onSearch = (setSearchQuery, setGallery, setIsLoading) => (event) => {
  const value = event.target.value;
  setSearchQuery(value);

  if (fetchImagesToken) {
    clearTimeout(fetchImagesToken);
  }

  if (value) {
    fetchImagesToken= setTimeout(() => {
      fetchImages(value, setGallery, setIsLoading);
    }, 500);
  }
}

const likeImage = (setFavouriteImages) => (imageId) => () => {
  setFavouriteImages(
    oldFavouriteImages => oldFavouriteImages.includes(imageId)
      ? oldFavouriteImages
      : oldFavouriteImages.concat([imageId])
  );
}

function Home({ favouriteImages, setFavouriteImages }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [gallery, setGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className={styles.page}>
      <Search
        searchQuery={searchQuery}
        onSearch={onSearch(setSearchQuery, setGallery, setIsLoading)}
        isLoading={isLoading}
      />
      <Gallery
        gallery={gallery}
        favouriteImages={favouriteImages}
        likeImage={likeImage(setFavouriteImages)}
      />
    </div>
  );
}

export default Home;
