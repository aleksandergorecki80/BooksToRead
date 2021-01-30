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
import { newBook, categories } from './state/state';
import { createLabel, printListOfBooks } from './functions/functions';

const intValue = () => {
  const localData = localStorage.getItem('books');
  return localData ? JSON.parse(localData) : [];
};

let booksList = intValue();
const app = document.getElementById('app');

// Licznik książek
const booksCounter = document.createElement('div');
booksCounter.innerHTML = booksList.length;
app.appendChild(booksCounter);
console.log(booksList.length);

const divBookList = document.createElement('div');
const ulBooksList = document.createElement('ul');
ulBooksList.id = "book-list";
divBookList.appendChild(ulBooksList);

const listOfBooks = document.getElementById('book-list');
printListOfBooks(booksList, listOfBooks);


const titleInput = new TextInput('input-title', 'text', 'title', '', 'Podaj tytuł');
const authorInput = new TextInput('input-author', 'text', 'author', '', 'Podaj autora');
const selectCategory = new Select('select-list', 'select-list', categories);

// const formDiv = document.getElementById('form');

// Formulaż
const form = crateForm();
const formDiv = document.createElement('div');
formDiv.id = 'form';
app.appendChild(formDiv);

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
formDiv.appendChild(form);


// Eventy
document.getElementById('input-title').addEventListener('keyup', (event) => {
  newBook.title = event.target.value;
});
document.getElementById('input-author').addEventListener('keyup', (event) => {
  newBook.author = event.target.value;
});
document.getElementById('select-list').addEventListener('change', (event) => {
  newBook.category = event.target.value;
});
const radios = document.querySelectorAll('input[type=radio]');
radios.forEach((radio) => {
  radio.addEventListener('change', (event) => {
    newBook.priority = event.target.value;
  });
});

// Submit form
const submitForm = document.getElementById('form');
submitForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (listOfBooks.childElementCount > 0) {
    while (listOfBooks.firstChild) {
        listOfBooks.removeChild(listOfBooks.lastChild);
    }
  }
  const book = new Book(newBook.title, newBook.author, newBook.category, newBook.priority);
  booksList.push(book);
  localStorage.setItem('books', JSON.stringify(booksList));
  printListOfBooks(booksList, listOfBooks);
});

// Delete book
listOfBooks.addEventListener('click', (event) => {
  if (event.target.className === 'remove-book') {
    while (listOfBooks.firstChild) {
        listOfBooks.removeChild(listOfBooks.lastChild);
    }
  }
  const newBooksList = booksList.filter((book) => {
    return book.id !== event.target.parentElement.id;
  });
  booksList = newBooksList;
  localStorage.setItem('books', JSON.stringify(booksList));
  printListOfBooks(booksList, listOfBooks);
});
