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
import { newBook } from './state/state';
import { createLabel } from './functions/functions';

const categories = [
  { value: 'kryminal', tekst: 'Kryminał' },
  { value: 'sciFi', tekst: 'Science fiction' },
  { value: 'fantasy', tekst: 'Fantasy' },
  { value: 'poezja', tekst: 'Poezja' },
  { value: 'dramat', tekst: 'Dramat' },
  { value: 'naukiScisle', tekst: 'Nauki ścisłe' },
];

let booksList = [];
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

const submitForm = document.getElementById('form');

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

const ulBookList = document.getElementById('book-list');

function createListOfBooks(books) {
  return books.map((book) => {
    const li = `<li id=${book.id}>
          ${book.title} - ${book.author}. 
          category: ${book.category}
          jak bardzo chcę przeczytać w skali 1-5: ${book.priority} <button id=${book.id} class=remove-book>Delete</button></li>`;
    return li;
  });
}

submitForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (ulBookList.childElementCount > 0) {
    for (let i = 0; i < ulBookList.childElementCount; i++) {
      ulBookList.removeChild(ulBookList.childNodes[i]);
    }
  }
  const book = new Book(newBook.title, newBook.author, newBook.category, newBook.priority);
  booksList.push(book);

  const liToAppend = document.createElement('li');
  const liContent = createListOfBooks(booksList);
  liToAppend.innerHTML = liContent;

  ulBookList.appendChild(liToAppend);
});

ulBookList.addEventListener('click', (event) => {
  if (event.target.className === 'remove-book') {
    // event.target.parentElement.remove();
    // console.log(event.target.parentElement.parentElement.id);
    if (ulBookList.childElementCount > 0) {
      for (let i = 0; i < ulBookList.childElementCount; i++) {
        ulBookList.removeChild(ulBookList.childNodes[i]);
      }
    }

    const newBooksList = booksList.filter((book) => {
      return book.id !== event.target.parentElement.id;
    });
    booksList = newBooksList;
    const liToAppend = document.createElement('li');
    const liContent = createListOfBooks(newBooksList);
    liToAppend.innerHTML = liContent;

    ulBookList.appendChild(liToAppend);
  }
});

window.onload = function () {
  //   console.log('LOADED!');
};
