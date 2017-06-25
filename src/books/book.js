import httpClient from '../helpers/httpClient';

function addBook(title, author) {
  return httpClient.post('/api/books', {
    title,
    author,
  });
}

function getBooks() {
  return httpClient.get('/api/books');
}

module.exports = {
  addBook,
  getBooks,
};
