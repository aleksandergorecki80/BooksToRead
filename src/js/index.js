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
import { categories, sortBy } from './state/state';
import {
  createLabel,
  displayTotalBooksAmountCounter,
  printListOfBooksFromSelectedCategory,
  displayTotalListOfBooks,
  categoriesCounter,
} from './functions/functions';
import {
  formFieldEvents,
  booksDataEnteredInForm,
  updateBooksDataEnteredInForm,
  findUpdatedPositionAndUpdate,
} from './events/evants';

const intValue = () => {
  const localData = localStorage.getItem('books');
  return localData ? JSON.parse(localData) : [];
};

let totalBooksCollection = intValue();
const app = document.getElementById('app');

// Formulaż
const form = crateForm();
const divToPlaceFor = document.createElement('div');
divToPlaceFor.id = 'form';

const titleInput = new TextInput(
  'input-title',
  'text',
  'title',
  booksDataEnteredInForm.title,
  'Podaj tytuł'
);
const authorInput = new TextInput(
  'input-author',
  'text',
  'author',
  booksDataEnteredInForm.author,
  'Podaj autora'
);
form.appendChild(titleInput.createTextInput());
form.appendChild(authorInput.createTextInput());

const selectCategory = new Select('select-list', 'select-list', categories);
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

// Kategorie
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
      const booksInCategory = printListOfBooksFromSelectedCategory(
        totalBooksCollection,
        category.tekst
      );

      const booksCounter = document.getElementById('books-counter');
      const amount = categoriesCounter(totalBooksCollection, category.tekst);
      booksCounter.innerHTML = `Na liście jest ${amount} pozycji.`;

      document.getElementById('book-list').innerHTML = booksInCategory;
    });
  }
});

// SORTOWANIE
const sortBooks = new Select('sort-list', 'sort-list', sortBy);
const labelForsortBooks = createLabel('sort-list', 'Sortuj sedług');
const sortByList = sortBooks.createSelect();
document.getElementById('sort-and-filter').appendChild(labelForsortBooks);
document.getElementById('sort-and-filter').appendChild(sortByList);

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

    displayTotalBooksAmountCounter(totalBooksCollection, booksCounterPlacer);
    // const listOfCategoriesToDisplay = printListOfCategories(categories, totalBooksCollection);
    // booksInCategoriesCountersPlacer.innerHTML = listOfCategoriesToDisplay;
    // location.reload();
  } else {
    // EDYTOWANIE
    const updatedBooksCollection = findUpdatedPositionAndUpdate(
      totalBooksCollection,
      booksDataEnteredInForm
    );
    localStorage.setItem('books', JSON.stringify(updatedBooksCollection));
    const totalListOfBooks = displayTotalListOfBooks(updatedBooksCollection);
    locationForListOfBooks.innerHTML = totalListOfBooks;

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

// const submitButton = new Submit('submit-button', 'submit', 'submit', 'Zapisz książkę');
