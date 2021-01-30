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

const ulBookList = document.getElementById('book-list');
printListOfBooks(booksList, ulBookList);
const form = crateForm();

const titleInput = new TextInput('input-title', 'text', 'title', '', 'Podaj tytuł');
const authorInput = new TextInput('input-author', 'text', 'author', '', 'Podaj autora');
const selectCategory = new Select('select-list', 'select-list', categories);

const app = document.getElementById('form');
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
app.appendChild(form);

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

const submitForm = document.getElementById('form');
submitForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (ulBookList.childElementCount > 0) {
    while (ulBookList.firstChild) {
      ulBookList.removeChild(ulBookList.lastChild);
    }
  }
  const book = new Book(newBook.title, newBook.author, newBook.category, newBook.priority);
  booksList.push(book);
  localStorage.setItem('books', JSON.stringify(booksList));
  printListOfBooks(booksList, ulBookList);
});

ulBookList.addEventListener('click', (event) => {
  if (event.target.className === 'remove-book') {
    while (ulBookList.firstChild) {
      ulBookList.removeChild(ulBookList.lastChild);
    }
  }
  const newBooksList = booksList.filter((book) => {
    return book.id !== event.target.parentElement.id;
  });
  booksList = newBooksList;
  localStorage.setItem('books', JSON.stringify(booksList));
  printListOfBooks(booksList, ulBookList);
});
