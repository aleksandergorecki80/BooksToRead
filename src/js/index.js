import { BooksList } from './classes/booksListClass';

import { Book } from './classes/bookClass';
import {
  displayTotalListOfBooks,
  returnAmountOfBoks,
  findObjectInArray,
} from './functions/functions';
import { formState } from './formElements/formState';
import { createLabel } from './formElements/formClass';
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

// IMPORT ELEMENTOW STRONY I KREACJA ELEMENTÓW
const modalBackground = pageElements.getModal();
const sortAndFilter = pageElements.getCategories();
const labelForsortBooks = createLabel('sort-list', 'Sortuj wg:');
const sortByList = pageElements.getSortByOption();
const booksCounterPlacer = pageElements.getCounter(collectionOfBooksObject);
const divToPlaceBookList = pageElements.getTableOfBooksDiv(collectionOfBooksObject);
const addBookBtn = pageElements.getAddBookButton();

const btnAllCategories = pageElements.getBtnAllBooks();

pageElements.getListOfCategories(sortAndFilter);

const btnAddNewCategory = pageElements.getBtnAddNewCategory();

sortAndFilter.append(btnAllCategories, btnAddNewCategory);
app.append(
  modalBackground,
  sortAndFilter,
  labelForsortBooks,
  sortByList,
  booksCounterPlacer,
  divToPlaceBookList,
  addBookBtn
);

// SORTOWANIE
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
});

//  -- ZAPISZ, USUŃ, EDYTUJ --
const submitForm = document.getElementById('form');
submitForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!formState.booksDataEnteredInForm.id) {
    //  ZAPISYWANIE NOWEJ POZYCJI
    const book = new Book(
      formState.booksDataEnteredInForm.title,
      formState.booksDataEnteredInForm.author,
      formState.booksDataEnteredInForm.category,
      formState.booksDataEnteredInForm.priority
    );
    collectionOfBooksObject.setTotalBooksCollection(book);
    const collectionOfBooks = collectionOfBooksObject.getTotalCollectionOfBooks();
    localStorage.setItem('books', JSON.stringify(collectionOfBooks));
    const totalListOfBooks = displayTotalListOfBooks(collectionOfBooks);
    const locationForListOfBooks = document.getElementById('list-of-books');
    locationForListOfBooks.innerHTML = totalListOfBooks;
    booksCounterPlacer.innerHTML = returnAmountOfBoks(collectionOfBooks.length);
    // formState.reSetState();
    // formState.resetForm();
    // document.getElementById('modal-background').style.display = 'none';
  } else {
    // ZAPISYWANIE EDYTOWANEJ POZYCJI
    const updatedState = collectionOfBooksObject.updateTotalCollectionOfBooks(
      formState.booksDataEnteredInForm
    );
    collectionOfBooksObject.replaceTotalBooksCollection(updatedState);
    const updatedBooksCollection = collectionOfBooksObject.getTotalCollectionOfBooks();
    localStorage.setItem('books', JSON.stringify(updatedBooksCollection));
    const totalListOfBooks = displayTotalListOfBooks(updatedBooksCollection);
    const locationForListOfBooks = document.getElementById('list-of-books');
    locationForListOfBooks.innerHTML = totalListOfBooks;
    // booksCounterPlacer.innerHTML = returnAmountOfBoks(collectionOfBooks.length);
    // formState.reSetState();
    // formState.resetForm();
    // document.getElementById('modal-background').style.display = 'none';
  }
  formState.reSetState();
  formState.resetForm();
  document.getElementById('modal-background').style.display = 'none';
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
    const totalListOfBooks = displayTotalListOfBooks(replacedTotalBooksCollection);
    const locationForListOfBooks = document.getElementById('list-of-books');
    locationForListOfBooks.innerHTML = totalListOfBooks;
    booksCounterPlacer.innerHTML = returnAmountOfBoks(replacedTotalBooksCollection.length);
  }
});

// // EDYTOWANIE POZYCJI
document.getElementById('list-of-books').addEventListener('click', (event) => {
  if (event.target.className === 'edit-book') {
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

// // EVENTY FORMULAŻA
document.getElementById('input-title').addEventListener('keyup', (event) => {
  formState.booksDataEnteredInForm.title = event.target.value;
});
document.getElementById('input-author').addEventListener('keyup', (event) => {
  formState.booksDataEnteredInForm.author = event.target.value;
});
document.getElementById('select-list').addEventListener('change', (event) => {
  formState.booksDataEnteredInForm.category = event.target.value;
});

const labelsCollection = document.getElementsByClassName('radio-label');
const labelsArr = [...labelsCollection];
labelsArr.forEach((element) => {
  element.addEventListener('click', (event) => {
    event.target.parentElement.children[0].checked = true;
    formState.booksDataEnteredInForm.priority = event.target.parentElement.children[0].value;
  });
});

// // EVENTY PRZYCISKÓW
addCategoryEvent();
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
document.getElementById('cancel-button').addEventListener('click', () => {
  document.getElementById('modal-background').style.display = 'none';
  document.getElementById('modal-body').style.display = 'none';
});
window.addEventListener('click', (e) => {
  if (e.target.id === 'modal-background') {
    document.getElementById('modal-background').style.display = 'none';
    document.getElementById('modal-body').style.display = 'none';
    document.getElementById('create-category').style.display = 'none';
  }
});

// DODAWANIE NOWEJ KATEGORII
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

  // USUWANIE ELEMENTU DOM Z KATEGORIAMI
  document.getElementById('sort-and-filter').remove();

  const sortAndFilter = pageElements.getCategories();
  const btnAddNewCategory = pageElements.getBtnAddNewCategory();
  const btnAllCategories = pageElements.getBtnAllBooks();

  sortAndFilter.appendChild(btnAllCategories);

  pageElements.getListOfCategories(sortAndFilter);
  sortAndFilter.appendChild(btnAddNewCategory);

  app.insertBefore(sortAndFilter, app.childNodes[0]);

  document.getElementById('modal-background').style.display = 'none';
  document.getElementById('create-category').style.display = 'none';
  categoriesFilters();
  addCategoryEvent();
  formState.reSetNewCategory();
});

function removePolishLetters(phrase) {
  const polskie = [
    'ą',
    'ć',
    'ę',
    'ł',
    'ń',
    'ó',
    'ś',
    'ź',
    'ż',
    'Ą',
    'Ć',
    'Ę',
    'Ł',
    'Ń',
    'Ó',
    'Ś',
    'Ź',
    'Ż',
    ' ',
  ];
  const niepolskie = [
    'a',
    'c',
    'e',
    'l',
    'n',
    'o',
    's',
    'z',
    'z',
    'A',
    'C',
    'L',
    'N',
    'O',
    'S',
    'Z',
    'Z',
    '',
  ];
  const arr = [...phrase];
  const newArr = arr.map((element) => {
    polskie.find((znak) => {
      if (znak === element) {
        element = niepolskie[polskie.indexOf(znak)];
      }
    });
    return element;
  });
  const nowyWyraz = newArr.join('');
  return nowyWyraz;
}
categoriesFilters();
function categoriesFilters() {
  // // FILTROWANIE PO KATEGORII
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
  });
}
