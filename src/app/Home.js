import React, { useState, useEffect } from 'react';
import styles from './Home.module.scss';
import Gallery from '../components/Gallery';
import Search from './home/Search';

function Home({ path, favouriteImages, likeImage }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [gallery, setGallery] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [emptyMessage, setEmptyMessage] = useState();
  const [showFetchMore, setShowFetchMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    if (!emptyMessage && searchQuery && gallery && gallery.length === 0) {
      setEmptyMessage('No images!');
    }
  }, [emptyMessage, gallery, searchQuery]);

  if (path !== '/') return null;

  return (
    <div className={styles.page}>
      <Search
        searchQuery={searchQuery}
        onSearchProps={{ setSearchQuery, setGallery, setIsLoading, setShowFetchMore }}
        isLoading={isLoading}
      />
      <Gallery
        emptyMessage={emptyMessage}
        gallery={gallery}
        favouriteImages={favouriteImages}
        likeImage={likeImage}
        onFetchMoreProps={{ gallery, searchQuery, setGallery, setShowFetchMore, setIsLoadingMore }}
        showFetchMore={showFetchMore}
        isLoadingMore={isLoadingMore}
      />
    </div>
  );
}

export default Home;
