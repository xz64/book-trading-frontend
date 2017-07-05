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

function getMyBooks() {
  return httpClient.get('/api/books/mine');
}

module.exports = {
  addBook,
  getBooks,
  getMyBooks,
};
