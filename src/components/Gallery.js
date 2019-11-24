import React from 'react';
import styles from './Gallery.module.scss';
import HeartIcon from '../heart.svg';

function Gallery({ gallery, likeImage, favouriteImages, emptyMessage }) {
  if (!gallery) return null;

  return (
    gallery.length === 0
      ? (<div className={styles.emptyState}>{emptyMessage}</div>)
      : <ul className={styles.gallery}>
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
  )
}

export default Gallery;
