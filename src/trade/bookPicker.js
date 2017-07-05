import { defineElement as el } from 'domvm';

import { getMyBooks } from '../books/book';

export default (vm) => {
  let books = [];

  vm.hook({
    didMount: () => {
      getMyBooks()
      .then((myBooks) => {
        books = myBooks;
        if (books.length > 0) {
          vm.emit('bookSelected', books[0]._id);
        }
        vm.redraw();
      });
    },
  });

  function onChange(e) {
    vm.emit('bookSelected', e.target.value);
  }

  return () => el('select', { onchange: onChange },
    books.map(book =>
      el('option', { value: book._id }, `${book.title} (${book.author})`),
    ),
  );
};
