import { BooksList } from './classes/booksListClass';
import { Select } from './formElements/selectClass';
import { Book } from './classes/bookClass';
import {
  displayTotalListOfBooks,
  returnAmountOfBoks,
  findObjectInArray,
} from './functions/functions';
import { formState } from './formElements/formState';
import { Form, createLabel } from './formElements/formClass';

const intValue = () => {
  const localData = localStorage.getItem('books');
  return localData ? JSON.parse(localData) : [];
};

const totalBooksCollection = intValue();
const totalCollectionOfBooks = new BooksList(totalBooksCollection);
totalCollectionOfBooks.setFilteredOrSortedState(totalBooksCollection);

const app = document.getElementById('app');

// FORMULAŻ
const form = new Form();
const formForAddingBooks = form.returnForm();
app.appendChild(formForAddingBooks);
const submitForm = document.getElementById('form');

// EVENTY FORMULAŻA
document.getElementById('input-title').addEventListener('keyup', (event) => {
  formState.booksDataEnteredInForm.title = event.target.value;
});
document.getElementById('input-author').addEventListener('keyup', (event) => {
  formState.booksDataEnteredInForm.author = event.target.value;
});
document.getElementById('select-list').addEventListener('change', (event) => {
  formState.booksDataEnteredInForm.category = event.target.value;
});
const radios = document.querySelectorAll('input[type=radio]');
radios.forEach((radio) => {
  radio.addEventListener('change', (event) => {
    formState.booksDataEnteredInForm.priority = event.target.value;
  });
});

// KATEGORIE
const sortAndFilter = document.createElement('div');
sortAndFilter.id = 'sort-and-filter';
app.appendChild(sortAndFilter);
const buttonWszystkie = document.createElement('button');
buttonWszystkie.innerHTML = 'Wszystko';
buttonWszystkie.id = 'all-books';
sortAndFilter.appendChild(buttonWszystkie);
document.getElementById('all-books').addEventListener('click', () => {
  const totalListOfBooks = displayTotalListOfBooks(collectionOfBooks);
  totalCollectionOfBooks.resetFilter();
  locationForListOfBooks.innerHTML = totalListOfBooks;
  booksCounterPlacer.innerHTML = returnAmountOfBoks(collectionOfBooks.length);
});
formState.categories.forEach((category) => {
  if (category.name !== '') {
    const button = document.createElement('button');
    button.innerHTML = category.tekst;
    button.id = category.name;

    document.getElementById('sort-and-filter').appendChild(button);
    document.getElementById(category.name).addEventListener('click', () => {
      const filteredArrayOfBooks = totalCollectionOfBooks.filterByCategory(category.tekst);
      totalCollectionOfBooks.setFilteredOrSortedState(filteredArrayOfBooks);
      const filteredListOfBooks = displayTotalListOfBooks(filteredArrayOfBooks);
      locationForListOfBooks.innerHTML = filteredListOfBooks;
      booksCounterPlacer.innerHTML = returnAmountOfBoks(filteredArrayOfBooks.length);
    });
  }
});

// SORTOWANIE
const sortBooks = new Select('sort-list', 'sort-list', formState.sortBy);
const labelForsortBooks = createLabel('sort-list', 'Sortuj sedług');
const sortByList = sortBooks.createSelect();
document.getElementById('sort-and-filter').appendChild(labelForsortBooks);
document.getElementById('sort-and-filter').appendChild(sortByList);
document.getElementById('sort-list').addEventListener('change', (event) => {
  const sortByPhrase = findObjectInArray(event.target.value, formState.sortBy);
  switch (sortByPhrase.name) {
    case 'priority':
      {
        const sortedData = totalCollectionOfBooks.sortByPriority();
        const sortedListOfBooks = displayTotalListOfBooks(sortedData);
        locationForListOfBooks.innerHTML = sortedListOfBooks;
      }
      break;
    case 'author':
      {
        const sortedData = totalCollectionOfBooks.sortByAuthor();
        const sortedListOfBooks = displayTotalListOfBooks(sortedData);
        locationForListOfBooks.innerHTML = sortedListOfBooks;
      }
      break;
    case 'title':
      {
        const sortedData = totalCollectionOfBooks.sortByTitle();
        const sortedListOfBooks = displayTotalListOfBooks(sortedData);
        locationForListOfBooks.innerHTML = sortedListOfBooks;
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
divToPlaceBookList.id = 'div-books';
const tableOfBooks = document.createElement('table');
tableOfBooks.id = 'book-list';

const thead = document.createElement('thead');
const trNaglowek = document.createElement('tr');
const thTitle = document.createElement('th');
thTitle.innerText = 'Tytuł';
const thAuthor = document.createElement('th');
thAuthor.innerText = 'Autor';
const thCategory = document.createElement('th');
thCategory.innerText = 'Kategoria';
const thPriority = document.createElement('th');
thPriority.innerText = 'Priorytet';

const locationForListOfBooks = document.createElement('tbody');

trNaglowek.append(thTitle, thAuthor, thCategory, thPriority);
thead.append(trNaglowek);
tableOfBooks.append(thead, locationForListOfBooks);
divToPlaceBookList.appendChild(tableOfBooks);
app.appendChild(divToPlaceBookList);

const totalListOfBooks = displayTotalListOfBooks(collectionOfBooks);
locationForListOfBooks.innerHTML = totalListOfBooks;

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
    totalCollectionOfBooks.setTotalBooksCollection(book);
    const collectionOfBooks = totalCollectionOfBooks.getTotalCollectionOfBooks();
    localStorage.setItem('books', JSON.stringify(collectionOfBooks));
    const totalListOfBooks = displayTotalListOfBooks(collectionOfBooks);
    locationForListOfBooks.innerHTML = totalListOfBooks;
    booksCounterPlacer.innerHTML = returnAmountOfBoks(collectionOfBooks.length);
    formState.reSetState();
    formState.resetForm();
  } else {
    // ZAPISYWANIE EDYTOWANEJ POZYCJI
    const updatedState = totalCollectionOfBooks.updateTotalCollectionOfBooks(
      formState.booksDataEnteredInForm
    );
    totalCollectionOfBooks.replaceTotalBooksCollection(updatedState);
    const updatedBooksCollection = totalCollectionOfBooks.getTotalCollectionOfBooks();
    localStorage.setItem('books', JSON.stringify(updatedBooksCollection));
    const totalListOfBooks = displayTotalListOfBooks(updatedBooksCollection);
    locationForListOfBooks.innerHTML = totalListOfBooks;
    booksCounterPlacer.innerHTML = returnAmountOfBoks(collectionOfBooks.length);
    formState.reSetState();
    formState.resetForm();
  }
});

// DELETE BOOK
locationForListOfBooks.addEventListener('click', (event) => {
  if (event.target.className === 'remove-book') {
    const newBooksList = totalCollectionOfBooks.removeBookFromCollection(
      event.target.parentElement.parentElement.dataset.id
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
      return book.id === event.target.parentElement.parentElement.dataset.id;
    });

    const dataToEdition = {
      id: event.target.parentElement.parentElement.dataset.id,
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
