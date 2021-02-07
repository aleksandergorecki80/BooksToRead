import { BooksList } from './classes/booksListClass';
import { Book } from './classes/bookClass';
import {
  displayTotalListOfBooks,
  returnAmountOfBoks,
  findObjectInArray,
  removePolishLetters,
} from './functions/functions';
import { formState } from './formElements/formState';
import { createLabel, Form } from './formElements/formClass';
import { pageElements } from './pageElements/pageElements';

const intValue = () => {
  const localData = localStorage.getItem('books');
  return localData ? JSON.parse(localData) : [];
};

const totalBooksCollection = intValue();
const collectionOfBooksObject = new BooksList(totalBooksCollection);
collectionOfBooksObject.setFilteredOrSortedState(totalBooksCollection);

const app = document.getElementById('app');
app.className = 'app';

// IMPORTING AND CREATING DOM ELEMENTS
const modalBackground = pageElements.getModal();
const sortAndFilter = pageElements.getCategories();
const labelForsortBooks = createLabel('sort-list', 'Sortuj wg:');
const sortByList = pageElements.getSortByOption();
const booksCounterPlacer = pageElements.getCounter(collectionOfBooksObject);
const divToPlaceBookList = pageElements.getTableOfBooksDiv(collectionOfBooksObject);
const addBookBtn = pageElements.getAddBookButton();

const btnAllCategories = pageElements.getBtnAllBooks();

sortAndFilter.appendChild(btnAllCategories);
pageElements.getListOfCategories(sortAndFilter);

const btnAddNewCategory = pageElements.getBtnAddNewCategory();

sortAndFilter.appendChild(btnAddNewCategory);
app.append(
  modalBackground,
  sortAndFilter,
  labelForsortBooks,
  sortByList,
  booksCounterPlacer,
  divToPlaceBookList,
  addBookBtn
);

// SORTING
document.getElementById('sort-list').addEventListener('change', (event) => {
  const sortByPhrase = findObjectInArray(event.target.value, formState.sortBy);
  switch (sortByPhrase.name) {
    case 'priority':
      {
        const sortedData = collectionOfBooksObject.sortByPriority();
        const sortedListOfBooks = displayTotalListOfBooks(sortedData);
        const locationForListOfBooks = document.getElementById('list-of-books');
        locationForListOfBooks.innerHTML = sortedListOfBooks;
      }
      break;
    case 'author':
      {
        const sortedData = collectionOfBooksObject.sortByAuthor();
        const sortedListOfBooks = displayTotalListOfBooks(sortedData);
        const locationForListOfBooks = document.getElementById('list-of-books');
        locationForListOfBooks.innerHTML = sortedListOfBooks;
      }
      break;
    case 'title':
      {
        const sortedData = collectionOfBooksObject.sortByTitle();
        const sortedListOfBooks = displayTotalListOfBooks(sortedData);
        const locationForListOfBooks = document.getElementById('list-of-books');
        locationForListOfBooks.innerHTML = sortedListOfBooks;
      }
      break;

    default:
  }
  categoryFilter();
  authorFilter();
  priorityFilter();
  document.getElementById('sort-list').value = '-- Wybierz --';
});

//  -- SAVE, REMOVE, EDIT --
const submitForm = document.getElementById('form');
submitForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!formState.booksDataEnteredInForm.id) {
    //  SAVE NEW BOOK
    const book = new Book(
      formState.booksDataEnteredInForm.title,
      formState.booksDataEnteredInForm.author,
      formState.booksDataEnteredInForm.category,
      formState.booksDataEnteredInForm.priority
    );
    collectionOfBooksObject.setTotalBooksCollection(book);
    const collectionOfBooks = collectionOfBooksObject.getTotalCollectionOfBooks();
    localStorage.setItem('books', JSON.stringify(collectionOfBooks));
    collectionOfBooksObject.setFilteredOrSortedState(collectionOfBooks);
    const totalListOfBooks = displayTotalListOfBooks(collectionOfBooks);
    const locationForListOfBooks = document.getElementById('list-of-books');
    locationForListOfBooks.innerHTML = totalListOfBooks;
    booksCounterPlacer.innerHTML = returnAmountOfBoks(collectionOfBooks.length);
  } else {
    // SAVE EDITING BOOK
    const updatedState = collectionOfBooksObject.updateTotalCollectionOfBooks(
      formState.booksDataEnteredInForm
    );
    collectionOfBooksObject.replaceTotalBooksCollection(updatedState);
    const updatedBooksCollection = collectionOfBooksObject.getTotalCollectionOfBooks();
    localStorage.setItem('books', JSON.stringify(updatedBooksCollection));
    collectionOfBooksObject.setFilteredOrSortedState(updatedBooksCollection);
    const totalListOfBooks = displayTotalListOfBooks(updatedBooksCollection);
    const locationForListOfBooks = document.getElementById('list-of-books');
    locationForListOfBooks.innerHTML = totalListOfBooks;
  }
  categoryFilter();
  authorFilter();
  priorityFilter();
  formState.reSetState();
  formState.resetForm();
  document.getElementById('submit-button').disabled = true;
  document.getElementById('modal-background').style.display = 'none';
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
    collectionOfBooksObject.setFilteredOrSortedState(replacedTotalBooksCollection);
    const totalListOfBooks = displayTotalListOfBooks(replacedTotalBooksCollection);
    const locationForListOfBooks = document.getElementById('list-of-books');
    locationForListOfBooks.innerHTML = totalListOfBooks;
    booksCounterPlacer.innerHTML = returnAmountOfBoks(replacedTotalBooksCollection.length);
  }
  categoryFilter();
  authorFilter();
  priorityFilter();
});

// ADD NEW CATEGORY
document.getElementById('input-category').addEventListener('keyup', (event) => {
  formState.setCategory(event.target.value);
});
document.getElementById('create-category').addEventListener('submit', (event) => {
  event.preventDefault();
  const setCategory = formState.getSetCategory();
  const name = removePolishLetters(setCategory).toLowerCase();
  const newCategoryObject = {
    name,
    tekst: setCategory,
  };
  formState.addNewCategory(newCategoryObject);
  // REMOVING DOM ELEMENT
  document.getElementById('sort-and-filter').remove();
  document.getElementById('select-list').parentElement.remove();

  const sortAndFilter = pageElements.getCategories();
  const btnAddNewCategory = pageElements.getBtnAddNewCategory();
  const btnAllCategories = pageElements.getBtnAllBooks();
  sortAndFilter.appendChild(btnAllCategories);
  pageElements.getListOfCategories(sortAndFilter);
  sortAndFilter.appendChild(btnAddNewCategory);

  const formObject = new Form();
  const category = formObject.getSelectCategory();

  app.insertBefore(sortAndFilter, app.childNodes[0]);

  const formOnDom = document.getElementById('form');
  formOnDom.insertBefore(category, formOnDom.childNodes[2]);

  document.getElementById('modal-background').style.display = 'none';
  document.getElementById('create-category').style.display = 'none';
  categoriesFilters();
  addCategoryEvent();
  formEvents();
  formState.reSetNewCategory();
});

// FILTERS
categoriesFilters();
// INPUTS EVENTS
formEvents();
// BUTTONS EVENTS
addCategoryEvent();
// ALL FILTERS
categoryFilter();
authorFilter();
priorityFilter();

function priorityFilter() {
  const priorityLinksCollection = document.getElementsByClassName('a-priority');
  const priorityLinksArr = [...priorityLinksCollection];
  priorityLinksArr.forEach((priority) => {
    priority.addEventListener('click', () => {
      printFilteredPriorities(priority.innerText);
    });
  });
}

function printFilteredPriorities(priorityInnerText) {
  const filteredArrayOfBooks = collectionOfBooksObject.filterByPriority(priorityInnerText);
  collectionOfBooksObject.setFilteredOrSortedState(filteredArrayOfBooks);
  const filteredListOfBooks = displayTotalListOfBooks(filteredArrayOfBooks);
  const locationForListOfBooks = document.getElementById('list-of-books');
  locationForListOfBooks.innerHTML = filteredListOfBooks;
  booksCounterPlacer.innerHTML = returnAmountOfBoks(filteredArrayOfBooks.length);
}

function authorFilter() {
  const authorLinksCollection = document.getElementsByClassName('a-author');
  const authorLinksArr = [...authorLinksCollection];
  authorLinksArr.forEach((author) => {
    author.addEventListener('click', () => {
      printFilteredAuthors(author.innerText);
    });
  });
}

function printFilteredAuthors(authorInnerText) {
  const filteredArrayOfBooks = collectionOfBooksObject.filterByAutor(authorInnerText);
  collectionOfBooksObject.setFilteredOrSortedState(filteredArrayOfBooks);
  const filteredListOfBooks = displayTotalListOfBooks(filteredArrayOfBooks);
  const locationForListOfBooks = document.getElementById('list-of-books');
  locationForListOfBooks.innerHTML = filteredListOfBooks;
  booksCounterPlacer.innerHTML = returnAmountOfBoks(filteredArrayOfBooks.length);
}

function categoryFilter() {
  const categoryLinksCollection = document.getElementsByClassName('a-category');
  const categoryLinksArr = [...categoryLinksCollection];
  categoryLinksArr.forEach((category) => {
    category.addEventListener('click', () => {
      printFilteredCategories(category.innerText);
    });
  });
}

function printFilteredCategories(categoryInnerText) {
  const filteredArrayOfBooks = collectionOfBooksObject.filterByCategory(categoryInnerText);
  collectionOfBooksObject.setFilteredOrSortedState(filteredArrayOfBooks);
  const filteredListOfBooks = displayTotalListOfBooks(filteredArrayOfBooks);
  const locationForListOfBooks = document.getElementById('list-of-books');
  locationForListOfBooks.innerHTML = filteredListOfBooks;
  booksCounterPlacer.innerHTML = returnAmountOfBoks(filteredArrayOfBooks.length);
}

function categoriesFilters() {
  // // FILTROWANIE PO KATEGORII u góry strony
  formState.categories.forEach((category) => {
    if (category.name !== '') {
      document.getElementById(category.name).addEventListener('click', () => {
        const filteredArrayOfBooks = collectionOfBooksObject.filterByCategory(category.tekst);
        collectionOfBooksObject.setFilteredOrSortedState(filteredArrayOfBooks);
        const filteredListOfBooks = displayTotalListOfBooks(filteredArrayOfBooks);
        const locationForListOfBooks = document.getElementById('list-of-books');
        locationForListOfBooks.innerHTML = filteredListOfBooks;
        booksCounterPlacer.innerHTML = returnAmountOfBoks(filteredArrayOfBooks.length);
      });
    }
  });

  document.getElementById('all-books').addEventListener('click', () => {
    const collectionOfBooks = collectionOfBooksObject.getTotalCollectionOfBooks();
    const totalListOfBooks = displayTotalListOfBooks(collectionOfBooks);

    collectionOfBooksObject.resetFilter();
    const locationForListOfBooks = document.getElementById('list-of-books');
    locationForListOfBooks.innerHTML = totalListOfBooks;
    booksCounterPlacer.innerHTML = returnAmountOfBoks(collectionOfBooks.length);
    categoryFilter();
  });
}

function formEvents() {
  // // EVENTY FORMULAŻA
  document.getElementById('input-title').addEventListener('keyup', (event) => {
    const title = event.target.value;
    const titleTrimmed = title.trim();
    const validatedTitle = validated(titleTrimmed);
    if (validatedTitle) {
      document.getElementById('add-book-error').innerText = '';
      formState.booksDataEnteredInForm.title = titleTrimmed;
    } else {
      document.getElementById('add-book-error').innerText = 'Wypełnij formulaż';
      document.getElementById('submit-button').disabled = true;
    }
    unlockSubmit();
  });
  document.getElementById('input-author').addEventListener('keyup', (event) => {
    const autor = event.target.value;
    const autorTrimmed = autor.trim();
    const validatedAutor = validated(autorTrimmed);

    if (validatedAutor) {
      document.getElementById('add-book-error').innerText = '';
      formState.booksDataEnteredInForm.author = autorTrimmed;
    } else {
      document.getElementById('add-book-error').innerText = 'Wypełnij formulaż';
      document.getElementById('submit-button').disabled = true;
    }

    // formState.booksDataEnteredInForm.author = event.target.value;
    unlockSubmit();
  });
  document.getElementById('select-list').addEventListener('change', (event) => {
    formState.booksDataEnteredInForm.category = event.target.value;
    unlockSubmit();
  });

  const labelsCollection = document.getElementsByClassName('radio-label');
  const labelsArr = [...labelsCollection];
  labelsArr.forEach((element) => {
    element.addEventListener('click', (event) => {
      event.target.parentElement.children[0].checked = true;
      formState.booksDataEnteredInForm.priority = event.target.parentElement.children[0].value;
    });
  });
}

const validated = (phrase) => {
  return phrase !== '';
};

function unlockSubmit() {
  if (formState.booksDataEnteredInForm.title && formState.booksDataEnteredInForm.author) {
    document.getElementById('submit-button').disabled = false;
  } else {
    document.getElementById('submit-button').disabled = true;
  }
}

function addCategoryEvent() {
  document.getElementById('add-category').addEventListener('click', () => {
    document.getElementById('modal-background').style.display = 'flex';
    document.getElementById('create-category').style.display = 'flex';
    document.getElementById('modal-body').style.display = 'none';
  });
}
document.getElementById('add-book-btn').addEventListener('click', () => {
  document.getElementById('modal-background').style.display = 'flex';
  document.getElementById('modal-body').style.display = 'flex';
});

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
