import httpClient from '../helpers/httpClient';

function createTrade(requesterBook, requestedBook) {
  return httpClient.post('/api/trades', {
    requesterBook,
    requestedBook,
  });
}

function getTrades() {
  return httpClient.get('/api/trades');
}

function acceptTrade(id) {
  return httpClient.post(`/api/trades/accept/${id}`);
}

function rejectTrade(id) {
  return httpClient.post(`/api/trades/reject/${id}`);
}

export default {
  createTrade,
  getTrades,
  acceptTrade,
  rejectTrade,
};
