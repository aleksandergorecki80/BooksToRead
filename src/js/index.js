// import * as mdb from 'mdb-ui-kit';

// export default {
//   mdb,
// };

// custom console

import { crateForm } from './formElements/form';
import { TextInput } from './formElements/textInputClass';
import { Select } from './formElements/selectClass';
import { RadioInput } from './formElements/radioInputClass';
import { Submit } from './formElements/submitClass';
import { Book } from './state/book';
import { categories } from './state/state';
import {
  createLabel,
  displayTotalBooksAmountCounter,
  printListOfCategories,
  printListOfBooksFromSelectedCategory,
  displayTotalListOfBooks,
} from './functions/functions';
import { formFieldEvents, newBook, updateNewBook } from './events/evants';

const intValue = () => {
  const localData = localStorage.getItem('books');
  return localData ? JSON.parse(localData) : [];
};

let totalAmoutOfBooks = intValue();
const app = document.getElementById('app');

// Formulaż
const form = crateForm();
const titleInput = new TextInput('input-title', 'text', 'title', newBook.title, 'Podaj tytuł');
const authorInput = new TextInput('input-author', 'text', 'author', newBook.author, 'Podaj autora');
const selectCategory = new Select('select-list', 'select-list', categories);

const divToPlaceFor = document.createElement('div');
divToPlaceFor.id = 'form';

form.appendChild(titleInput.createTextInput());
form.appendChild(authorInput.createTextInput());

const labelForSelect = createLabel('select-list', 'Wybierz kategorię');
const selectCategoryList = selectCategory.createSelect();
form.appendChild(labelForSelect);
form.appendChild(selectCategoryList);

const labelForRadiosList = createLabel('select', 'Jak barszo chcesz przeczytać');
form.appendChild(labelForRadiosList);
for (let i = 1; i <= 5; i++) {
  const priorityButton = new RadioInput(`${i}-priority`, 'radio', 'priority', i);
  const label = document.createElement('label');
  label.htmlFor = 'priority';
  const description = document.createTextNode(i);
  label.appendChild(description);
  form.appendChild(priorityButton.crateRadioInput());
  form.appendChild(label);
  form.appendChild(description);
}

const submitButton = new Submit('submit-button', 'submit', 'submit', 'Zapisz książkę');
form.appendChild(submitButton.creteSubmit());
divToPlaceFor.appendChild(form);
app.appendChild(divToPlaceFor);

// Eventy formulaza
formFieldEvents();

// Submit form
const submitForm = document.getElementById('form');

// Liczniki książek
const countersPlacer = document.createElement('div');
const booksCounterPlacer = document.createElement('div');
const booksInCategoriesCountersPlacer = document.createElement('div');
countersPlacer.append(booksCounterPlacer, booksInCategoriesCountersPlacer);

const listOfCategoriesToDisplay = printListOfCategories(categories, totalAmoutOfBooks);
booksInCategoriesCountersPlacer.innerHTML = listOfCategoriesToDisplay;

displayTotalBooksAmountCounter(totalAmoutOfBooks, booksCounterPlacer);
app.appendChild(countersPlacer);

// Wyświetlanie książek
const divToPlaceBookList = document.createElement('div');
const containerForSingleBook = document.createElement('ul');
containerForSingleBook.id = 'book-list';
divToPlaceBookList.appendChild(containerForSingleBook);
app.appendChild(divToPlaceBookList);
const locationForListOfBooks = document.getElementById('book-list');
const totalListOfBooks = displayTotalListOfBooks(totalAmoutOfBooks);
locationForListOfBooks.innerHTML = totalListOfBooks;

submitForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const book = new Book(newBook.title, newBook.author, newBook.category, newBook.priority);
  totalAmoutOfBooks.push(book);
  localStorage.setItem('books', JSON.stringify(totalAmoutOfBooks));

  const totalListOfBooks = displayTotalListOfBooks(totalAmoutOfBooks);
  locationForListOfBooks.innerHTML = totalListOfBooks;

  displayTotalBooksAmountCounter(totalAmoutOfBooks, booksCounterPlacer);
  const listOfCategoriesToDisplay = printListOfCategories(categories, totalAmoutOfBooks);
  booksInCategoriesCountersPlacer.innerHTML = listOfCategoriesToDisplay;
  location.reload();
});

// Delete book
locationForListOfBooks.addEventListener('click', (event) => {
  if (event.target.className === 'remove-book') {
    const newBooksList = totalAmoutOfBooks.filter((book) => {
      return book.id !== event.target.parentElement.id;
    });
    totalAmoutOfBooks = newBooksList;
    localStorage.setItem('books', JSON.stringify(totalAmoutOfBooks));

    const totalListOfBooks = displayTotalListOfBooks(totalAmoutOfBooks);
    locationForListOfBooks.innerHTML = totalListOfBooks;

    displayTotalBooksAmountCounter(totalAmoutOfBooks, booksCounterPlacer);
    const listOfCategoriesToDisplay = printListOfCategories(categories, totalAmoutOfBooks);
    booksInCategoriesCountersPlacer.innerHTML = listOfCategoriesToDisplay;
    location.reload();
  }
});

// Edit book
locationForListOfBooks.addEventListener('click', (event) => {
  if (event.target.className === 'edit-book') {
    console.log(event.target.parentElement.id);
    const selectedBookToEdit = totalAmoutOfBooks.find((book) => {
      return book.id === event.target.parentElement.id;
    });
    const dataToEdition = {
      title: selectedBookToEdit.title,
      author: selectedBookToEdit.author,
      category: selectedBookToEdit.category,
      priority: selectedBookToEdit.priority,
    };
    updateNewBook(dataToEdition)
    // newBook = editedBook;
    console.log(dataToEdition);
  }
  
});

document.querySelectorAll('.category-counters').forEach((item) => {
  item.addEventListener('click', (event) => {
    event.preventDefault();
    const listOfBooksFromSelectedCategory = printListOfBooksFromSelectedCategory(
      totalAmoutOfBooks,
      event.target.innerText
    );
    locationForListOfBooks.innerHTML = listOfBooksFromSelectedCategory;
  });
});

