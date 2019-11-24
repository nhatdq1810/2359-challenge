import React from 'react';
import Gallery from '../components/Gallery';

export default function Favourites({ favouriteImages, likeImage }) {
  return (
    <>
      {favouriteImages.length === 0 && (<div>There is nothing here!</div>)}
      <Gallery gallery={favouriteImages} favouriteImages={favouriteImages} likeImage={likeImage} />
    </>
  )
}
