import { form } from '../form/addBookForm';
import { formState } from '../form/formState';
import { functions } from '../functions/functions';
import { Select } from '../form/formElements/selectClass';

export const pageElements = {
  getModal() {
    // MODAL
    const modalBackground = document.createElement('div');
    modalBackground.className = 'modal-background';
    modalBackground.id = 'modal-background';
    return modalBackground;
  },
  getAddNewBookForm() {
    const div = document.createElement('div');
    div.id = 'modal-body';
    div.className = 'modal-body';
    const formForAddingBooks = form.returnForm();
    div.appendChild(formForAddingBooks);
    return div;
  },
  getBtnAllBooks() {
    const btnAllBooks = document.createElement('label');
    btnAllBooks.className = 'checkbox-container';
    btnAllBooks.innerText = 'All';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'all-books';
    checkbox.checked = true;
    const span = document.createElement('span');
    span.className = 'checkbox-span';
    btnAllBooks.append(checkbox, span);
    return btnAllBooks;
  },
  getBtnShowFilters() {
    const btnShowFilters = document.createElement('button');
    btnShowFilters.innerHTML = 'Show filters';
    btnShowFilters.id = 'show-filters';
    btnShowFilters.className = 'show-filters-btn';
    return btnShowFilters;
  },
  getCategories() {
    // KATEGORIE
    const sortAndFilter = document.createElement('div');
    sortAndFilter.id = 'sort-and-filter';
    sortAndFilter.className = 'sort-and-filter';

    return sortAndFilter;
  },
  getListOfCategories(sortAndFilter) {
    return formState.categories.map((category) => {
      if (category.name !== '') {
        const label = document.createElement('label');
        label.className = 'checkbox-container';
        label.innerText = category.tekst;
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = category.name;
        const span = document.createElement('span');
        span.className = 'checkbox-span';
        label.append(checkbox, span);
        sortAndFilter.appendChild(label);
      }
      return sortAndFilter;
    });
  },
  getCounter(collectionOfBooksObject) {
    // LICZNIK KSIĄŻEK
    const booksCounterPlacer = document.createElement('div');
    booksCounterPlacer.id = 'books-counter';
    booksCounterPlacer.className = 'books-counter';
    const collectionOfBooks = collectionOfBooksObject.getTotalCollectionOfBooks();
    booksCounterPlacer.innerHTML = functions.returnAmountOfBoks(collectionOfBooks.length);
    return booksCounterPlacer;
  },
  getTableOfBooksDiv() {
    // WYŚWIETLANIE KSIĄŻEK
    const divToPlaceBookList = document.createElement('div');
    divToPlaceBookList.id = 'div-books';
    divToPlaceBookList.className = 'div-books';
    const tableOfBooks = document.createElement('table');
    tableOfBooks.id = 'book-list';
    tableOfBooks.className = 'table-of-books';

    const thead = document.createElement('thead');
    const trNaglowek = document.createElement('tr');
    const thTitle = document.createElement('th');
    thTitle.innerText = 'Title / Author';
    const thCategory = document.createElement('th');
    thCategory.innerText = 'Category';
    const thPriority = document.createElement('th');
    thPriority.innerText = 'Priority';
    const thPlaceholder = document.createElement('th');
    thPlaceholder.innerText = '';

    const locationForListOfBooks = document.createElement('tbody');
    locationForListOfBooks.id = 'list-of-books';
    trNaglowek.append(thTitle, thCategory, thPriority, thPlaceholder);
    thead.append(trNaglowek);
    tableOfBooks.append(thead, locationForListOfBooks);
    divToPlaceBookList.appendChild(tableOfBooks);
    return divToPlaceBookList;
  },

  getSortByOption() {
    // SORTOWANIE
    const sortBooks = new Select('sort-list', 'sort-list', formState.sortBy);
    const sortByList = sortBooks.createSelect();
    return sortByList;
  },

  getAddBookButton() {
    // PRZYCISK DODAJ POZYCJĘ
    const addBookBtn = document.createElement('button');
    addBookBtn.id = 'add-book-btn';
    addBookBtn.innerText = 'Add a new book';
    return addBookBtn;
  },
};
