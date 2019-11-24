import React from 'react';
import styles from './Gallery.module.scss';
import HeartIcon from '../assets/heart.svg';
import { searchImagesApi } from '../services/api';

const onFetchMore = ({ gallery, searchQuery, setGallery, setShowFetchMore, setIsLoadingMore }) => async () => {
  let result = [];

  setIsLoadingMore(true);

  const response = await fetch(searchImagesApi({ searchQuery, limit: 8, offset: gallery.length }));
  if (response.status === 200) {
    result = (await response.json()).data;

    if (result.length === 0) {
      setShowFetchMore(false);
    }
  }

  setGallery(oldGallery => oldGallery.concat(result));
  setIsLoadingMore(false);
}

function Gallery({
  gallery, likeImage, favouriteImages,
  emptyMessage, onFetchMoreProps, showFetchMore, isLoadingMore
}) {
  if (!gallery) return null;

  return (
    gallery.length === 0
      ? (<div className={styles.emptyState}>{emptyMessage}</div>)
      : (
        <>
          <ul className={styles.gallery}>
            {gallery.map((image) => (
              <li key={image.id} className={styles.galleryItem} onClick={likeImage(image)}>
                <img
                  className={styles.galleryImage}
                  src={image.images.original_still.url}
                  alt={image.title}
                />
                <div className={`${styles.favouriteIcon} ${favouriteImages.some(fi => fi.id === image.id) ? styles.active : ''}`}>
                  <img src={HeartIcon} alt="like icon" />
                </div>
              </li>
            ))}
          </ul>
          {onFetchMoreProps && (
            <button
              onClick={onFetchMore(onFetchMoreProps)}
              disabled={isLoadingMore || !showFetchMore}
              className={styles.fetchMoreButton}
            >
              {isLoadingMore
                ? 'Loading...'
                : showFetchMore
                  ? 'Fetch more'
                  : 'No more'}
            </button>
          )}
        </>
      )
  )
}

export default Gallery;
