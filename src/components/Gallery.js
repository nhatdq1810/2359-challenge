import React from 'react';
import styles from './Gallery.module.scss';
import HeartIcon from '../heart.svg';

function Gallery({ gallery, likeImage, favouriteImages }) {
  return (
    <ul className={styles.gallery}>
      {gallery.map((image) => {
        const galleryItemProps = {
          key: image.id,
          className: styles.galleryItem,
          onClick: likeImage ? likeImage(image.id) : undefined
        };

        return (
          <li {...galleryItemProps}>
            <img
              className={styles.galleryImage}
              src={image.images.original_still.url}
              alt={image.title}
            />
            <div className={`${styles.favouriteIcon} ${favouriteImages.includes(image.id) ? styles.active : ''}`}>
              <img src={HeartIcon} alt="like icon" />
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default Gallery;
