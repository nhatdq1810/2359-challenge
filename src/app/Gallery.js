import React from 'react';
import styles from './Gallery.module.scss';
import HeartIcon from '../heart.svg';

function Gallery({gallery}) {
  return (
    <ul className={styles.gallery}>
      {gallery.map((image) => (
        <li key={image.id} className={styles.galleryItem}>
          <img className={styles.galleryImage} src={image.images.original_still.url} alt={image.title} />
          <button className={styles.likeButton}>
            <img src={HeartIcon} alt="like icon" />
          </button>
        </li>
      ))}
    </ul>
  )
}

export default Gallery;
