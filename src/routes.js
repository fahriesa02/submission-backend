const {saveBooksHandler, showallBooksHandler,
  showdetailBooksHandler, deleteBooksHandler} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: saveBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{bookIdParam?}',
    handler: showallBooksHandler,
  },
  {
    method: 'PUT',
    path: '/books/{bookIdParam}',
    handler: showdetailBooksHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBooksHandler,
  },
];

module.exports = routes;
