const searchImagesApiKey = 'E4ChLnZqoVvB0fZXoi3DJjJqSQE2dp07';
const searchImagesApi = ({ searchQuery, limit, offset }) =>
  `http://api.giphy.com/v1/gifs/search?api_key=${
  searchImagesApiKey
  }&offset=${
  offset
  }&limit=${
  limit
  }&q=${
  encodeURIComponent(searchQuery)
  }`;

export { searchImagesApi };
