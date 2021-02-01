import { BooksList } from './classes/booksListClass';
import { resetForm, displayForm } from './formElements/form';
import { Select } from './formElements/selectClass';
import { Book } from './classes/bookClass';
import {
  createLabel,
  printListOfBooksFromSelectedCategory,
  displayTotalListOfBooks,
  returnAmountOfBoks,
  findObjectInArray,
} from './functions/functions';
import {
  formFieldEvents,
  booksDataEnteredInForm,
  updateBooksDataEnteredInForm,
  categories,
  sortBy,
} from './classes/state';

const intValue = () => {
  const localData = localStorage.getItem('books');
  return localData ? JSON.parse(localData) : [];
};

const totalBooksCollection = intValue();
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
      booksCounterPlacer.innerHTML = returnAmountOfBoks(filteredArrayOfBooks.length);
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
  const sortByPhrase = findObjectInArray(event.target.value, sortBy);
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

// LICZNIK KSIĄŻEK

const booksCounterPlacer = document.createElement('div');
booksCounterPlacer.id = 'books-counter';
const collectionOfBooks = totalCollectionOfBooks.getTotalCollectionOfBooks();
booksCounterPlacer.innerHTML = returnAmountOfBoks(collectionOfBooks.length);
app.appendChild(booksCounterPlacer);

// WYŚWIETLANIE KSIĄŻEK
const divToPlaceBookList = document.createElement('div');
const locationForListOfBooks = document.createElement('ul');
locationForListOfBooks.id = 'book-list';
divToPlaceBookList.appendChild(locationForListOfBooks);
app.appendChild(divToPlaceBookList);

const totalListOfBooks = displayTotalListOfBooks(collectionOfBooks);
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
    totalCollectionOfBooks.setTotalBooksCollection(book);
    const collectionOfBooks = totalCollectionOfBooks.getTotalCollectionOfBooks();
    localStorage.setItem('books', JSON.stringify(collectionOfBooks));
    const totalListOfBooks = displayTotalListOfBooks(collectionOfBooks);
    locationForListOfBooks.innerHTML = totalListOfBooks;
    booksCounterPlacer.innerHTML = returnAmountOfBoks(collectionOfBooks.length);
    updateBooksDataEnteredInForm({
      id: '',
      title: '',
      author: '',
      category: '',
      priority: 5,
    });
    resetForm();
  } else {
    // ZAPISYWANIE EDYTOWANEJ POZYCJI
    const updatedState = totalCollectionOfBooks.updateTotalCollectionOfBooks(
      booksDataEnteredInForm
    );
    totalCollectionOfBooks.replaceTotalBooksCollection(updatedState);
    const updatedBooksCollection = totalCollectionOfBooks.getTotalCollectionOfBooks();
    localStorage.setItem('books', JSON.stringify(updatedBooksCollection));
    const totalListOfBooks = displayTotalListOfBooks(updatedBooksCollection);
    locationForListOfBooks.innerHTML = totalListOfBooks;
    booksCounterPlacer.innerHTML = returnAmountOfBoks(collectionOfBooks.length);
    updateBooksDataEnteredInForm({
      id: '',
      title: '',
      author: '',
      category: '',
      priority: 5,
    });
    resetForm();
  }
});

// DELETE BOOK
locationForListOfBooks.addEventListener('click', (event) => {
  if (event.target.className === 'remove-book') {
    const newBooksList = totalCollectionOfBooks.removeBookFromCollection(
      event.target.parentElement.id
    );
    totalCollectionOfBooks.replaceTotalBooksCollection(newBooksList);
    const replacedTotalBooksCollection = totalCollectionOfBooks.getTotalCollectionOfBooks();
    localStorage.setItem('books', JSON.stringify(replacedTotalBooksCollection));
    const totalListOfBooks = displayTotalListOfBooks(replacedTotalBooksCollection);
    locationForListOfBooks.innerHTML = totalListOfBooks;
    booksCounterPlacer.innerHTML = returnAmountOfBoks(replacedTotalBooksCollection.length);
  }
});

// EDYTOWANIE POZYCJI
locationForListOfBooks.addEventListener('click', (event) => {
  if (event.target.className === 'edit-book') {
    const selectedBookToEdit = totalCollectionOfBooks.getTotalCollectionOfBooks().find((book) => {
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
