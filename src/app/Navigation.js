import React from 'react';

const navigateTo = (setPath, path) => () => {
  setPath(path);
}

export default function Navigation({ setPath }) {
  return (
    <nav>
      <button onClick={navigateTo(setPath, '/')}>Gallereasy</button>
      <button onClick={navigateTo(setPath, '/')}>Search</button>
      <button onClick={navigateTo(setPath, '/favourites')}>Favourites</button>
    </nav>
  )
}
