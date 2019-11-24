import React from 'react';
import Gallery from '../components/Gallery';
import styles from './Favourites.module.scss';

export default function Favourites({ favouriteImages, likeImage }) {
  return (
    <>
      {favouriteImages.length === 0 && (<div className={styles.emptyState}>There is nothing here!</div>)}
      <Gallery gallery={favouriteImages} favouriteImages={favouriteImages} likeImage={likeImage} />
    </>
  )
}
