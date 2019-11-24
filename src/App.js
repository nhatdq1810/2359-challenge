import React, { useState } from 'react';
import Home from './app/Home';
import Navigation from './app/Navigation';
import Favourites from './app/Favourites';

const likeImage = (setFavouriteImages) => (favouriteImage) => () => {
  setFavouriteImages(
    oldFavouriteImages => oldFavouriteImages.some(image => image.id === favouriteImage.id)
      ? oldFavouriteImages.filter(image => image.id !== favouriteImage.id)
      : oldFavouriteImages.concat([favouriteImage])
  );
}

function App() {
  const [path, setPath] = useState('/');
  const [favouriteImages, setFavouriteImages] = useState([]);

  return (
    <>
      <Navigation path={path} setPath={setPath} />
      {<Home path={path} favouriteImages={favouriteImages} likeImage={likeImage(setFavouriteImages)} />}
      {<Favourites path={path} favouriteImages={favouriteImages} likeImage={likeImage(setFavouriteImages)} />}
    </>
  );
}

export default App;
