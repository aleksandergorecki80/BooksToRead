// import * as mdb from 'mdb-ui-kit';

// export default {
//   mdb,
// };

// custom console
import { BooksList } from './classes/booksListClass';
import { resetForm, displayForm } from './formElements/form';
import { Select } from './formElements/selectClass';
import { Book } from './state/book';
import {} from './state/state';
import {
  createLabel,
  displayTotalBooksAmountCounter,
  printListOfBooksFromSelectedCategory,
  displayTotalListOfBooks,
} from './functions/functions';
import {
  formFieldEvents,
  booksDataEnteredInForm,
  updateBooksDataEnteredInForm,
  findUpdatedPositionAndUpdate,
  categories,
  sortBy,
} from './events/evants';

const intValue = () => {
  const localData = localStorage.getItem('books');
  return localData ? JSON.parse(localData) : [];
};

let totalBooksCollection = intValue();
const totalCollectionOfBooks = new BooksList(totalBooksCollection);
totalCollectionOfBooks.setFilteredOrSortedState(totalBooksCollection);

const app = document.getElementById('app');

// Formulaż
displayForm();

// Eventy formulaza
formFieldEvents();

// Submit form
const submitForm = document.getElementById('form');

// Kategorie i filtrowanie po kategoriach
const sortAndFilter = document.createElement('div');
sortAndFilter.id = 'sort-and-filter';
app.appendChild(sortAndFilter);
categories.forEach((category) => {
  if (category.name !== '') {
    const button = document.createElement('button');
    button.innerHTML = category.tekst;
    button.id = category.name;

    document.getElementById('sort-and-filter').appendChild(button);
    document.getElementById(category.name).addEventListener('click', () => {
      const filteredArrayOfBooks = totalCollectionOfBooks.filterByCategory(category.tekst);
      totalCollectionOfBooks.setFilteredOrSortedState(filteredArrayOfBooks);
      const totalListOfBooks = displayTotalListOfBooks(filteredArrayOfBooks);
      locationForListOfBooks.innerHTML = totalListOfBooks;
      const booksCounter = document.getElementById('books-counter');
      booksCounter.innerHTML = `Na liście jest ${filteredArrayOfBooks.length} pozycji.`;
    });
  }
});

// SORTOWANIE
const sortBooks = new Select('sort-list', 'sort-list', sortBy);
const labelForsortBooks = createLabel('sort-list', 'Sortuj sedług');
const sortByList = sortBooks.createSelect();
document.getElementById('sort-and-filter').appendChild(labelForsortBooks);
document.getElementById('sort-and-filter').appendChild(sortByList);
document.getElementById('sort-list').addEventListener('change', (event) => {
  const sortByPhrase = sortBy.find((element) => {
    if (event.target.value === element.tekst) {
      return element.name;
    }
  });
  switch (sortByPhrase.name) {
    case 'priority':
      {
        const sortedData = totalCollectionOfBooks.sortByPriority();
        const totalListOfBooks = displayTotalListOfBooks(sortedData);
        locationForListOfBooks.innerHTML = totalListOfBooks;
      }
      break;
    case 'author':
      {
        const sortedData = totalCollectionOfBooks.sortByAuthor();
        const totalListOfBooks = displayTotalListOfBooks(sortedData);
        locationForListOfBooks.innerHTML = totalListOfBooks;
      }
      break;
    case 'title':
      {
        const sortedData = totalCollectionOfBooks.sortByTitle();
        const totalListOfBooks = displayTotalListOfBooks(sortedData);
        locationForListOfBooks.innerHTML = totalListOfBooks;
      }
      break;

    default:
  }
});

// Liczniki książek

const booksCounterPlacer = document.createElement('div');
booksCounterPlacer.id = 'books-counter';
app.appendChild(booksCounterPlacer);
displayTotalBooksAmountCounter(totalBooksCollection, booksCounterPlacer);

// Wyświetlanie książek
const divToPlaceBookList = document.createElement('div');
const locationForListOfBooks = document.createElement('ul');
locationForListOfBooks.id = 'book-list';
divToPlaceBookList.appendChild(locationForListOfBooks);
app.appendChild(divToPlaceBookList);
// const locationForListOfBooks = document.getElementById('book-list');
const totalListOfBooks = displayTotalListOfBooks(totalBooksCollection);
locationForListOfBooks.innerHTML = totalListOfBooks;

submitForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!booksDataEnteredInForm.id) {
    //  ZAPISYWANIE NOWEJ POZYCJI
    const book = new Book(
      booksDataEnteredInForm.title,
      booksDataEnteredInForm.author,
      booksDataEnteredInForm.category,
      booksDataEnteredInForm.priority
    );
    totalBooksCollection.push(book);
    localStorage.setItem('books', JSON.stringify(totalBooksCollection));

    const totalListOfBooks = displayTotalListOfBooks(totalBooksCollection);
    locationForListOfBooks.innerHTML = '';
    locationForListOfBooks.innerHTML = totalListOfBooks;

    resetForm();

    displayTotalBooksAmountCounter(totalBooksCollection, booksCounterPlacer);
  } else {
    // EDYTOWANIE
    resetForm();
    const updatedBooksCollection = findUpdatedPositionAndUpdate(
      totalBooksCollection,
      booksDataEnteredInForm
    );
    localStorage.setItem('books', JSON.stringify(updatedBooksCollection));
    const totalListOfBooks = displayTotalListOfBooks(updatedBooksCollection);
    locationForListOfBooks.innerHTML = totalListOfBooks;
    resetForm();

    displayTotalBooksAmountCounter(updatedBooksCollection, booksCounterPlacer);
    // const listOfCategoriesToDisplay = printListOfCategories(categories, updatedBooksCollection);
    // booksInCategoriesCountersPlacer.innerHTML = listOfCategoriesToDisplay;
    // location.reload();
  }
});

// Delete book
locationForListOfBooks.addEventListener('click', (event) => {
  if (event.target.className === 'remove-book') {
    const newBooksList = totalBooksCollection.filter((book) => {
      return book.id !== event.target.parentElement.id;
    });
    totalBooksCollection = newBooksList;
    localStorage.setItem('books', JSON.stringify(totalBooksCollection));

    const totalListOfBooks = displayTotalListOfBooks(totalBooksCollection);
    locationForListOfBooks.innerHTML = totalListOfBooks;

    displayTotalBooksAmountCounter(totalBooksCollection, booksCounterPlacer);
    // const listOfCategoriesToDisplay = printListOfCategories(categories, totalBooksCollection);
    // booksInCategoriesCountersPlacer.innerHTML = listOfCategoriesToDisplay;
    // location.reload();
  }
});

// Edit book
locationForListOfBooks.addEventListener('click', (event) => {
  if (event.target.className === 'edit-book') {
    const selectedBookToEdit = totalBooksCollection.find((book) => {
      return book.id === event.target.parentElement.id;
    });
    const dataToEdition = {
      id: event.target.parentElement.id,
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

    updateBooksDataEnteredInForm(dataToEdition);
    // newBook = editedBook;
  }
});

document.querySelectorAll('.category-counters').forEach((item) => {
  item.addEventListener('click', (event) => {
    const listOfBooksFromSelectedCategory = printListOfBooksFromSelectedCategory(
      totalBooksCollection,
      event.target.innerText
    );
    locationForListOfBooks.innerHTML = listOfBooksFromSelectedCategory;
  });
});
