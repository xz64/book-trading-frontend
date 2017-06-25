import { defineElement as el, defineView as vw } from 'domvm';

import { localizedText as lt } from '../helpers/localizedText';
import bookRow from './bookRow';
import Book from './book';

export default (vm) => {
  let books = [];
  let loading = true;

  vm.hook({
    didMount: () => {
      Book.getBooks().then((allBooks) => {
        books = allBooks;
        loading = false;
        vm.redraw();
      });
    },
  });

  return () => (loading ? el('span', [lt('loading')]) : (el('table', [
    el('thead', [
      el('tr', [
        el('th.pa3', [lt('title')]),
        el('th.pa3', [lt('author')]),
        el('th.pa3', [lt('owner')]),
        el('th.pa3', [lt('actions')]),
      ]),
    ]),
    el('tbody', books.map(book => vw(bookRow, book))),
  ])));
};
