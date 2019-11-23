import React, { useState } from 'react';
import Home from './app/Home';
import Navigation from './app/Navigation';
import Favourites from './app/Favourites';

function App() {
  const [path, setPath] = useState('/');
  const [favouriteImages, setFavouriteImages] = useState([]);

  return (
    <>
      <Navigation setPath={setPath} />
      {path === '/' && <Home favouriteImages={favouriteImages} setFavouriteImages={setFavouriteImages} />}
      {path === '/favourites' && <Favourites favouriteImages={favouriteImages} />}
    </>
  );
}

export default App;
