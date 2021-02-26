import { v4 as uuidv4 } from 'uuid';
import { BooksList } from './books/booksListClass';
import { pageElements } from './pageElements/pageElements';
import { createLabel, functions } from './functions/functions';
import { formState } from './form/formState';
import { printAddCategoryForm } from './form/addCategoryForm';
import { events } from './functions/events';

const app = document.getElementById('app');
app.className = 'app';

// INITIAL VALUE OF A BOOKS LIST
const intValue = () => {
  const localBooksData = localStorage.getItem('books');
  return localBooksData ? JSON.parse(localBooksData) : [];
};

const totalBooksCollection = intValue();
const collectionOfBooksObject = new BooksList(totalBooksCollection);
collectionOfBooksObject.resetFilter();

// IMPORTING AND CREATING DOM ELEMENTS
const modalBackground = pageElements.getModal();
// FORMULAŻ DODAWANIA NOWEJ KSIĄŻKI
const addNewBookForm = pageElements.getAddNewBookForm();
// FORMULAŻ DODAWANIA NOWEJ KATEGORII
const addCategoryForm = printAddCategoryForm();
modalBackground.append(addCategoryForm, addNewBookForm);

const addBookBtn = pageElements.getAddBookButton();
const sortAndFilter = pageElements.getCategories();
const labelForsortBooks = createLabel('sort-list', 'Sortuj wg:');
const sortByList = pageElements.getSortByOption();

const booksCounterPlacer = pageElements.getCounter(collectionOfBooksObject);
const divToPlaceBookList = pageElements.getTableOfBooksDiv(collectionOfBooksObject);
const btnAllCategories = pageElements.getBtnAllBooks();
sortAndFilter.appendChild(btnAllCategories);
pageElements.getListOfCategories(sortAndFilter);
const btnShowFilters = pageElements.getBtnShowFilters();

app.append(
  modalBackground,
  btnShowFilters,
  sortAndFilter,
  labelForsortBooks,
  sortByList,
  booksCounterPlacer,
  divToPlaceBookList,
  addBookBtn
);

// INITIAL FILTERED
const intFiltered = () => {
  const localFiltered = localStorage.getItem('filtered');
  return localFiltered ? JSON.parse(localFiltered) : '';
};
const initialFiltered = intFiltered();
if (initialFiltered.length > 0) {
  collectionOfBooksObject.setFilteredOrSortedState(initialFiltered);
  const collectionOfBooks = collectionOfBooksObject.gettFilteredOrSortedState();
  const htmlListOfBooks = functions.displayTotalListOfBooks(collectionOfBooks);
  functions.render(htmlListOfBooks, collectionOfBooks);
} else {
  const collectionOfBooks = collectionOfBooksObject.getTotalCollectionOfBooks();
  const htmlListOfBooks = functions.displayTotalListOfBooks(collectionOfBooks);
  functions.render(htmlListOfBooks, collectionOfBooks);
}

//  ADD A NEW BOOK BUTTON -- LISTENER
document.getElementById('add-book-btn').addEventListener('click', () => {
  document.getElementById('modal-background').style.display = 'flex';
  document.getElementById('modal-body').style.display = 'flex';
});

// CANCEL BUTTONS LISTENERS
const cancelCollection = document.getElementsByClassName('cancel-button');
const cancelArr = [...cancelCollection];
cancelArr.forEach((element) => {
  element.addEventListener('click', () => {
    document.getElementById('modal-background').style.display = 'none';
    document.getElementById('modal-body').style.display = 'none';
    document.getElementById('create-category').style.display = 'none';
    formState.reSetState();
    formState.resetForm();
  });
});

/// /  ***   ADD NEW BOOK FORM EVENT LISTENERS  ***   ///

// INPUT TITLE EVENT
document.getElementById('input-title').addEventListener('keyup', (event) => {
  const title = event.target.value;
  const titleTrimmed = title.trim();
  const validatedTitle = functions.validated(titleTrimmed);
  if (validatedTitle) {
    document.getElementById('add-book-error').innerText = '';
    formState.setTitle(titleTrimmed);
  } else {
    document.getElementById('add-book-error').innerText = 'Wypełnij formulaż';
    document.getElementById('submit-button').disabled = true;
  }
  functions.unlockSubmit(
    formState.booksDataEnteredInForm.title,
    formState.booksDataEnteredInForm.author
  );
});
// INPUT AUTHOR EVENT
document.getElementById('input-author').addEventListener('keyup', (event) => {
  const autor = event.target.value;
  const autorTrimmed = autor.trim();
  const validatedAutor = functions.validated(autorTrimmed);

  if (validatedAutor) {
    document.getElementById('add-book-error').innerText = '';
    formState.setAuthor(autorTrimmed);
  } else {
    document.getElementById('add-book-error').innerText = 'Wypełnij formulaż';
    document.getElementById('submit-button').disabled = true;
  }
  functions.unlockSubmit(
    formState.booksDataEnteredInForm.title,
    formState.booksDataEnteredInForm.author
  );
});
// SELECT LIST EVENT
events.selectListEvent();

// RADIO BUTTONS EVENT
const labelsCollection = document.getElementsByClassName('radio-label');
const labelsArr = [...labelsCollection];
labelsArr.forEach((element) => {
  element.addEventListener('click', (event) => {
    event.target.parentElement.children[0].checked = true;
    formState.setPriority(event.target.parentElement.children[0].value);
  });
});

// //  -- SAVE, REMOVE, EDIT --
const submitForm = document.getElementById('form');
submitForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!formState.booksDataEnteredInForm.id) {
    //  SAVE NEW BOOK
    const newBookData = formState.getBooksDataEnteredInForm();
    const book = {
      id: uuidv4(),
      title: newBookData.title,
      author: newBookData.author,
      category: newBookData.category,
      priority: newBookData.priority.toString(),
    };
    collectionOfBooksObject.setTotalBooksCollection(book);
    const collectionOfBooks = collectionOfBooksObject.getTotalCollectionOfBooks();
    localStorage.setItem('books', JSON.stringify(collectionOfBooks));
    const htmlListOfBooks = functions.displayTotalListOfBooks(collectionOfBooks);

    functions.render(htmlListOfBooks, collectionOfBooks);

    document.getElementById('modal-background').style.display = 'none';
  } else {
    // SAVE EDITIED BOOK
    const updatedState = collectionOfBooksObject.updateTotalCollectionOfBooks(
      formState.booksDataEnteredInForm
    );
    collectionOfBooksObject.replaceTotalBooksCollection(updatedState);
    const updatedBooksCollection = collectionOfBooksObject.getTotalCollectionOfBooks();
    localStorage.setItem('books', JSON.stringify(updatedBooksCollection));
    const totalListOfBooks = functions.displayTotalListOfBooks(updatedBooksCollection);

    const locationForListOfBooks = document.getElementById('list-of-books');
    locationForListOfBooks.innerHTML = totalListOfBooks;
  }
  formState.reSetState();
  formState.resetForm();
  document.getElementById('submit-button').disabled = true;
  document.getElementById('modal-background').style.display = 'none';
  events.tableOfBooksLinksFilters(collectionOfBooksObject);
});
// EDITING BOOK
document.getElementById('list-of-books').addEventListener('click', (event) => {
  if (event.target.className === 'edit-book') {
    document.getElementById('submit-button').disabled = false;
    document.getElementById('modal-background').style.display = 'flex';
    document.getElementById('modal-body').style.display = 'flex';
    const selectedBookToEdit = collectionOfBooksObject.getTotalCollectionOfBooks().find((book) => {
      return book.id === event.target.parentElement.parentElement.parentElement.dataset.id;
    });
    const dataToEdition = {
      id: event.target.parentElement.parentElement.parentElement.dataset.id,
      title: selectedBookToEdit.title,
      author: selectedBookToEdit.author,
      category: selectedBookToEdit.category,
      priority: selectedBookToEdit.priority,
    };

    const inputTitle = document.getElementById('input-title');
    const inputAuthor = document.getElementById('input-author');
    const selectList = document.getElementById('select-list');
    const radioButton = document.getElementById(`${selectedBookToEdit.priority}-priority`);

    inputTitle.value += selectedBookToEdit.title;
    inputAuthor.value += selectedBookToEdit.author;
    selectList.value = selectedBookToEdit.category;
    radioButton.checked = true;

    formState.updateBooksDataEnteredInForm(dataToEdition);
  }
});
// DELETE BOOK
document.getElementById('list-of-books').addEventListener('click', (event) => {
  if (event.target.className === 'remove-book') {
    const newBooksList = collectionOfBooksObject.removeBookFromCollection(
      event.target.parentElement.parentElement.parentElement.dataset.id
    );
    collectionOfBooksObject.replaceTotalBooksCollection(newBooksList);
    const replacedTotalBooksCollection = collectionOfBooksObject.getTotalCollectionOfBooks();

    localStorage.setItem('books', JSON.stringify(replacedTotalBooksCollection));
    const htmlListOfBooks = functions.displayTotalListOfBooks(replacedTotalBooksCollection);
    functions.render(htmlListOfBooks, replacedTotalBooksCollection);
  }
});

// SORTING
document.getElementById('sort-list').addEventListener('change', (event) => {
  const sortByPhrase = functions.findObjectInArray(event.target.value, formState.sortBy);
  if (collectionOfBooksObject.gettFilteredOrSortedState() === '') {
    const state = collectionOfBooksObject.getTotalCollectionOfBooks();
    collectionOfBooksObject.setFilteredOrSortedState(state);
  }

  switch (sortByPhrase.name) {
    case 'priority':
      {
        const sortedData = collectionOfBooksObject.sortByPriority();
        collectionOfBooksObject.setFilteredOrSortedState(sortedData);
        localStorage.setItem('filtered', JSON.stringify(sortedData));
        const sortedListOfBooks = functions.displayTotalListOfBooks(sortedData);
        const locationForListOfBooks = document.getElementById('list-of-books');
        locationForListOfBooks.innerHTML = sortedListOfBooks;
      }
      break;
    case 'author':
      {
        const sortedData = collectionOfBooksObject.sortByAuthor();
        collectionOfBooksObject.setFilteredOrSortedState(sortedData);
        localStorage.setItem('filtered', JSON.stringify(sortedData));
        const sortedListOfBooks = functions.displayTotalListOfBooks(sortedData);
        const locationForListOfBooks = document.getElementById('list-of-books');
        locationForListOfBooks.innerHTML = sortedListOfBooks;
      }
      break;
    case 'title':
      {
        const sortedData = collectionOfBooksObject.sortByTitle();
        collectionOfBooksObject.setFilteredOrSortedState(sortedData);
        localStorage.setItem('filtered', JSON.stringify(sortedData));
        const sortedListOfBooks = functions.displayTotalListOfBooks(sortedData);
        const locationForListOfBooks = document.getElementById('list-of-books');
        locationForListOfBooks.innerHTML = sortedListOfBooks;
      }
      break;

    default:
  }
  document.getElementById('sort-list').value = '-- Select --';
});

// FILTERING BY AUTHOR, CATEGORY OR RATING WHEN CLICKED
events.tableOfBooksLinksFilters(collectionOfBooksObject);

// // TOP PAGES FILTERING EVENT LISTENERS
formState.categories.forEach((category) => {
  if (category.name !== '') {
    document.getElementById(category.name).addEventListener('change', (event) => {
      if (event.target.checked) {
        const category = formState.categories.find((category) => category.name === event.target.id);
        collectionOfBooksObject.addCategoryToFiltersGroup(category.tekst);
        const filteredByMultipleCategories = collectionOfBooksObject.filterByMultipleCategories();

        collectionOfBooksObject.setFilteredOrSortedState(filteredByMultipleCategories);
        const htmlListOfBooks = functions.displayTotalListOfBooks(filteredByMultipleCategories);
        functions.render(htmlListOfBooks, filteredByMultipleCategories);
        localStorage.setItem('filtered', JSON.stringify(filteredByMultipleCategories));
        events.tableOfBooksLinksFilters(collectionOfBooksObject);
        document.getElementById('all-books').checked = false;
      } else {
        collectionOfBooksObject.removeCategoryFromFiltersGroup(category.tekst);

        const filteredByMultipleCategories = collectionOfBooksObject.filterByMultipleCategories();
        collectionOfBooksObject.setFilteredOrSortedState(filteredByMultipleCategories);
        const htmlListOfBooks = functions.displayTotalListOfBooks(filteredByMultipleCategories);
        functions.render(htmlListOfBooks, filteredByMultipleCategories);
        localStorage.setItem('filtered', JSON.stringify(filteredByMultipleCategories));
        events.tableOfBooksLinksFilters(collectionOfBooksObject);
      }
    });
  }
});

// SHOW & HIDE CATEGORY FILTERS
const showFiletrsButton = document.getElementById('show-filters');
showFiletrsButton.addEventListener('click', () => {
  const div = document.getElementById('sort-and-filter');
  const classList = div.classList.value;
  const ifDisplay = classList.search('display-filters');
  if (ifDisplay === -1) {
    div.classList.add('display-filters');
    showFiletrsButton.innerText = 'Hide filters';
  } else {
    div.classList.remove('display-filters');
    showFiletrsButton.innerText = 'Show filters';
  }
});

document.getElementById('all-books').addEventListener('change', () => {
  const collectionOfBooks = collectionOfBooksObject.getTotalCollectionOfBooks();
  const htmlListOfBooks = functions.displayTotalListOfBooks(collectionOfBooks);
  functions.render(htmlListOfBooks, collectionOfBooks);
  collectionOfBooksObject.resetFilter();
  localStorage.setItem('filtered', JSON.stringify([]));
  events.tableOfBooksLinksFilters(collectionOfBooksObject);

  formState.categories.forEach((category) => {
    if (category.name !== '') {
      document.getElementById(category.name).checked = false;
    }
  });
});

window.addEventListener('click', (e) => {
  if (e.target.id === 'modal-background') {
    document.getElementById('modal-background').style.display = 'none';
    document.getElementById('modal-body').style.display = 'none';
    document.getElementById('create-category').style.display = 'none';
  }
});

document.onkeydown = function (evt) {
  evt = evt || window.event;
  let isEscape = false;
  if ('key' in evt) {
    isEscape = evt.key === 'Escape' || evt.key === 'Esc';
  } else {
    isEscape = evt.keyCode === 27;
  }
  if (isEscape) {
    document.getElementById('modal-background').style.display = 'none';
    document.getElementById('modal-body').style.display = 'none';
    document.getElementById('create-category').style.display = 'none';
  }
};
