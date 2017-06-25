import httpClient from '../helpers/httpClient';

function addBook(title, author) {
  return httpClient.post('/api/books', {
    title,
    author,
  });
}

module.exports = {
  addBook,
};
