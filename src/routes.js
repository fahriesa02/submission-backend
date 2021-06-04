const {saveBooksHandler, showallBooksHandler,
  showdetailBooksHandler, editBooksHandler,
  deleteBooksHandler} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: saveBooksHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: showallBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: showdetailBooksHandler,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: editBooksHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBooksHandler,
  },
];

module.exports = routes;
