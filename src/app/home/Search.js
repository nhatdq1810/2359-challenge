import React from 'react';
import styles from './Search.module.scss';

export default function Search({ searchQuery, onSearch, isLoading }) {
  return (
    <div className={styles.searchArea}>
      <input
        type="text"
        placeholder="Start searching for images!"
        className={styles.inputSearch}
        value={searchQuery}
        onChange={onSearch}
      />
      {isLoading && <span className={styles.loadingIndicator}>Loading...</span>}
    </div>
  )
}
