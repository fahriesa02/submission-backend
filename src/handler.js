const {nanoid} = require('nanoid');
const {filter} = require('./books');
const books = require('./books');
// kriteria 1
const saveBooksHandler = (request, h) => {
  const {name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading} = request.payload;

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = (pageCount === readPage);

  const completeList = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };
  books.push(completeList);

  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal Menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }
  const isSuccess = books.filter((book) => book.id === id).length > 0;
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        Id: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};
// kriteria 2
const showallBooksHandler = (request, h) => {
  const {name, reading, finished} = request.query;
  if (!name && !reading && !finished) {
    const response = h.response({
      status: 'success',
      data: {
        books: books.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    }).code(200);
    return response;
  }

  if (name) {
    const filteredBooksName = books.filter((book) => {
      const nameRegex = new RegExp(name, 'gi');
      return nameRegex.test(book.name);
    });

    const response = h.response({
      status: 'success',
      data: {
        books: filteredBooksName.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    }).code(200);
    return response;
  }

  if (reading) {
    const filteredBooksReading = books.filter(
        (book) => Number(book.reading) === Number(reading),
    );
    const response = h.response({
      status: 'success',
      data: {
        books: filteredBooksReading.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    }).code(200);
    return response;
  }

  const filteredBooksFinished = books.filter(
      (book) => Number(book.finished) === Number(finished),
  );

  const response = h.response({
    status: 'success',
    data: {
      books: filteredBooksFinished.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  }).code(200);
  return response;
};
// kriteria 3
const showdetailBooksHandler = (request, h) => {
  const {bookId} = request.params;

  const book = books.filter((b) => b.id === bookId)[0];

  if (book) {
    const response = h.response({
      status: 'success',
      data: {
        book,
      },
    }).code(200);
    return response;
  }

  const response = (request, h) => ({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  }).code(404);
  return response;
};
// kriteria 4
const editBooksHandler = (request, h) => {
  const {bookId} = request.params;

  const {
    name, year,
    author, summary,
    publisher, pageCount,
    readPage, reading,
  } = request.payload;

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    }).code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
    return response;
  }

  const index = books.findIndex((note) => note.id === bookId);
  if (index !== -1) {
    books[index] = {
      ...books[index],
      name, year,
      author, summary,
      publisher, pageCount,
      readPage, reading,
      finished, updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    }).code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  }).code(404);
  return response;
};
//kriteria 5
const deleteBooksHandler = (request, h) => {
  const {bookId} = request.params;
  const index = books.findIndex((note) => note.id === bookId);

  if (index !== -1) {
    books.splice(index, 1);

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    }).code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  }).code(404);
  return response;
};

module.exports = {saveBooksHandler, showallBooksHandler,
  showdetailBooksHandler, editBooksHandler, deleteBooksHandler};
