import React, { useState, useEffect } from 'react';
import Gallery from '../components/Gallery';

const fetchImageById = async (imageId, setFavouriteGallery) => {
  const response = await fetch(`http://api.giphy.com/v1/gifs/${imageId}?api_key=E4ChLnZqoVvB0fZXoi3DJjJqSQE2dp07&gif_id=${imageId}`);
  if (response.status === 200) {
    const result = await response.json();
    setFavouriteGallery(oldFavouriteGallery => oldFavouriteGallery.concat([result.data]));
  }
}

export default function Favourites({ favouriteImages }) {
  const [favouriteGallery, setFavouriteGallery] = useState([]);

  useEffect(() => {
    if (favouriteImages.length > 0) {
      favouriteImages.forEach((imageId) => fetchImageById(imageId, setFavouriteGallery));
    }
  }, [favouriteImages])

  return (
    <>
      {favouriteGallery.length === 0 && (<div>There is nothing here!</div>)}
      <Gallery gallery={favouriteGallery} favouriteImages={favouriteImages} />
    </>
  )
}
