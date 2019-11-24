import React, { useState, useEffect } from 'react';
import styles from './Home.module.scss';
import Gallery from '../components/Gallery';
import Search from './home/Search';
import { searchImagesApi } from '../services/api';

const fetchImages = async (searchQuery, setGallery, setIsLoading) => {
  let result = [];

  setIsLoading(true);

  const response = await fetch(searchImagesApi({searchQuery, limit: 8, offset: 0}));
  if (response.status === 200) {
    result = (await response.json()).data;
  }

  setGallery(result);
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
    fetchImagesToken = setTimeout(() => {
      fetchImages(value, setGallery, setIsLoading);
    }, 500);
  }
}

function Home({ path, favouriteImages, likeImage }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [gallery, setGallery] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [emptyMessage, setEmptyMessage] = useState();

  useEffect(() => {
    if (!emptyMessage && searchQuery && gallery && gallery.length === 0) {
      setEmptyMessage('No images!');
    }
  }, [emptyMessage, gallery, searchQuery])

  if (path !== '/') return null;

  return (
    <div className={styles.page}>
      <Search
        searchQuery={searchQuery}
        onSearch={onSearch(setSearchQuery, setGallery, setIsLoading)}
        isLoading={isLoading}
      />
      <Gallery
        emptyMessage={emptyMessage}
        gallery={gallery}
        favouriteImages={favouriteImages}
        likeImage={likeImage}
      />
    </div>
  );
}

export default Home;
