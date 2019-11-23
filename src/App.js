import React, { useState } from 'react';
import { debounce } from 'lodash';
import styles from './App.module.scss';

const fetchImages = (searchQuery, setGallery) => async () => {
  const response = await fetch(`http://api.giphy.com/v1/gifs/search?api_key=E4ChLnZqoVvB0fZXoi3DJjJqSQE2dp07&limit=8&q=${searchQuery}`);
  if (response.status === 200) {
    const result = await response.json();
    setGallery(result.data);
  }
};

const onSearch = (setSearchQuery) => (event) => {
  const value = event.target.value;
  setSearchQuery(value);
}

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [gallery, setGallery] = useState([]);

  return (
    <div className={styles.page}>
      <input type="text" value={searchQuery} onChange={onSearch(setSearchQuery)} />
      <button onClick={fetchImages(searchQuery, setGallery)}>click</button>
      <div className={styles.gallery}>
        {gallery.map((image) => (
          <div key={image.id} className={styles.galleryItem}>
            <img className={styles.galleryImage} src={image.images.original_still.url} alt={image.title} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
