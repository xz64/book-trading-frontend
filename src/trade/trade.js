import httpClient from '../helpers/httpClient';

function createTrade(requesterBook, requestedBook) {
  return httpClient.post('/api/trades', {
    requesterBook,
    requestedBook,
  });
}

export default {
  createTrade,
};
