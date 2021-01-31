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
  printListOfBooks,
  categoriesCounter,
  displayHowManyBooksInCategories,
  displayTotalBooksAmountCounter,
  printListOfCategories,
} from './functions/functions';
import { formFieldEvents, newBook } from './events/evants';

const intValue = () => {
  const localData = localStorage.getItem('books');
  return localData ? JSON.parse(localData) : [];
};

let totalAmoutOfBooks = intValue();
const app = document.getElementById('app');

// Formulaż
const form = crateForm();
const titleInput = new TextInput('input-title', 'text', 'title', '', 'Podaj tytuł');
const authorInput = new TextInput('input-author', 'text', 'author', '', 'Podaj autora');
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

// const howManyCryminals = categoriesCounter(totalAmoutOfBooks, 'Kryminał');
// const howManySciFi = categoriesCounter(totalAmoutOfBooks, 'Science fiction');
// const howManyFantasy = categoriesCounter(totalAmoutOfBooks, 'Poezja');
// const howManyPoezja = categoriesCounter(totalAmoutOfBooks, 'Fantasy');
// const howManyDramat = categoriesCounter(totalAmoutOfBooks, 'Dramat');
// const howManyNaukiScisle = categoriesCounter(totalAmoutOfBooks, 'Nauki ścisłe');
console.log(categories);
const listOfCategoriesToDisplay = printListOfCategories(categories);
booksInCategoriesCountersPlacer.innerHTML = listOfCategoriesToDisplay;

displayTotalBooksAmountCounter(totalAmoutOfBooks, booksCounterPlacer);
// displayAmountOfBooksInEachCategory();
app.appendChild(countersPlacer);

// Wyświetlanie książek
const divToPlaceBookList = document.createElement('div');
const containerForSingleBook = document.createElement('ul');
containerForSingleBook.id = 'book-list';
divToPlaceBookList.appendChild(containerForSingleBook);
app.appendChild(divToPlaceBookList);
const listOfBooks = document.getElementById('book-list');
printListOfBooks(totalAmoutOfBooks, listOfBooks);

submitForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (listOfBooks.childElementCount > 0) {
    while (listOfBooks.firstChild) {
      listOfBooks.removeChild(listOfBooks.lastChild);
    }
  }
  const book = new Book(newBook.title, newBook.author, newBook.category, newBook.priority);
  totalAmoutOfBooks.push(book);
  localStorage.setItem('books', JSON.stringify(totalAmoutOfBooks));
  printListOfBooks(totalAmoutOfBooks, listOfBooks);
  displayTotalBooksAmountCounter(totalAmoutOfBooks, booksCounterPlacer);
  // displayAmountOfBooksInEachCategory();
});

// Delete book
listOfBooks.addEventListener('click', (event) => {
  if (event.target.className === 'remove-book') {
    while (listOfBooks.firstChild) {
      listOfBooks.removeChild(listOfBooks.lastChild);
    }
    const newBooksList = totalAmoutOfBooks.filter((book) => {
      return book.id !== event.target.parentElement.id;
    });
    totalAmoutOfBooks = newBooksList;
    localStorage.setItem('books', JSON.stringify(totalAmoutOfBooks));
    printListOfBooks(totalAmoutOfBooks, listOfBooks);
    displayTotalBooksAmountCounter(totalAmoutOfBooks, booksCounterPlacer);
    // displayAmountOfBooksInEachCategory();
  }
});

// function displayAmountOfBooksInEachCategory(){
//     booksInCategoriesCountersPlacer.innerHTML = displayHowManyBooksInCategories(
//         howManyCryminals,
//         howManySciFi,
//         howManyFantasy,
//         howManyPoezja,
//         howManyDramat,
//         howManyNaukiScisle
//       );
// }

const selectedCategoryButton = document.getElementsByClassName('category-counters');
const selectedCategoryButtonArr = [...selectedCategoryButton];
// kryminalyKategoriaButton.addEventListener('click')

selectedCategoryButtonArr.forEach((element) => {
  // console.log(element);
});
