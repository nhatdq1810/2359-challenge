import React from 'react';
import styles from './Search.module.scss';
import { searchImagesApi } from '../../services/api';

const fetchImages = async (searchQuery, setGallery, setIsLoading, setShowFetchMore) => {
  let result = [];

  setIsLoading(true);

  const response = await fetch(searchImagesApi({ searchQuery, limit: 8, offset: 0 }));
  if (response.status === 200) {
    result = (await response.json()).data;

    if (result.length > 0) {
      setShowFetchMore(true);
    }
  }

  setGallery(result);
  setIsLoading(false);
};

let fetchImagesToken = null;

const onSearch = ({ setSearchQuery, setGallery, setIsLoading, setShowFetchMore }) => (event) => {
  const value = event.target.value;
  setSearchQuery(value);

  if (fetchImagesToken) {
    clearTimeout(fetchImagesToken);
  }

  if (value) {
    fetchImagesToken = setTimeout(() => {
      fetchImages(value, setGallery, setIsLoading, setShowFetchMore);
    }, 500);
  }
}

export default function Search({ searchQuery, onSearchProps, isLoading }) {
  return (
    <div className={styles.searchArea}>
      <input
        type="text"
        placeholder="Start searching for images!"
        className={styles.inputSearch}
        value={searchQuery}
        onChange={onSearch(onSearchProps)}
      />
      {isLoading && <span className={styles.loadingIndicator}>Loading...</span>}
    </div>
  )
}
