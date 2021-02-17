import { form } from '../form/addBookForm';
import { formState } from '../form/formState';
import { displayTotalListOfBooks, functions } from '../functions/functions';
import { Select } from '../form/formElements/selectClass';
import { printAddCategoryForm } from '../form/addCategoryForm';

export const pageElements = {
  getModal() {
    // MODAL
    const modalBackground = document.createElement('div');
    modalBackground.className = 'modal-background';
    modalBackground.id = 'modal-background';

    // FORMULAŻ DODAWANIA NOWEJ KSIĄŻKI
    const formForAddingBooks = form.returnForm();

    const modalBody = document.createElement('div');
    modalBody.id = 'modal-body';
    modalBody.className = 'modal-body';
    modalBody.appendChild(formForAddingBooks);

    // FORMULAŻ DODAWANIA NOWEJ KATEGORII
    const addCategoryForm = printAddCategoryForm();

    modalBackground.append(addCategoryForm, modalBody);
    return modalBackground;
  },

  getBtnAllBooks() {
    const btnAllBooks = document.createElement('button');
    btnAllBooks.innerHTML = 'Wszystko';
    btnAllBooks.id = 'all-books';
    return btnAllBooks;
  },
  getBtnAddNewCategory() {
    const buttonAddNewCategory = document.createElement('button');
    buttonAddNewCategory.innerHTML = 'Dodaj Nową Kategorię';
    buttonAddNewCategory.id = 'add-category';
    return buttonAddNewCategory;
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
        const button = document.createElement('button');
        button.innerHTML = category.tekst;
        button.id = category.name;
        sortAndFilter.appendChild(button);
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
  getTableOfBooksDiv(collectionOfBooksObject) {
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
    thTitle.innerText = 'Tytuł / Autor';
    // const thAuthor = document.createElement('th');
    // thAuthor.innerText = 'Autor';
    const thCategory = document.createElement('th');
    thCategory.innerText = 'Kategoria';
    const thPriority = document.createElement('th');
    thPriority.innerText = 'Priorytet';
    const thPlaceholder = document.createElement('th');
    thPlaceholder.innerText = '';

    const locationForListOfBooks = document.createElement('tbody');
    locationForListOfBooks.id = 'list-of-books';
    const collectionOfBooks = collectionOfBooksObject.getTotalCollectionOfBooks();
    const totalListOfBooks = displayTotalListOfBooks(collectionOfBooks);
    locationForListOfBooks.innerHTML = totalListOfBooks;

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
    addBookBtn.innerText = 'Dodaj nową pozycję';
    return addBookBtn;
  },
};
