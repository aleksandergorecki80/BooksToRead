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
const collectionOfBooksObject = new BooksList(totalBooksCollection);
collectionOfBooksObject.setFilteredOrSortedState(totalBooksCollection);

const app = document.getElementById('app');
app.className = 'app';

// FORMULAŻ DODAWANIA NOWEJ KSIĄŻKI
const form = new Form();
const formForAddingBooks = form.returnForm();

const modalBackground = document.createElement('div');
modalBackground.className = 'modal-background';
modalBackground.id = 'modal-background';

const modalBody = document.createElement('div');
modalBody.id = 'modal-body';
modalBody.className = 'modal-body';
modalBody.appendChild(formForAddingBooks);

// FORMULAŻ DODAWANIA NOWEJ KATEGORII
const addCategoryForm = formState.printAddingCategoryForm();
modalBackground.append(addCategoryForm, modalBody);

// KATEGORIE
const sortAndFilter = document.createElement('div');
sortAndFilter.id = 'sort-and-filter';
sortAndFilter.className = 'sort-and-filter';

const buttonWszystkie = document.createElement('button');
buttonWszystkie.innerHTML = 'Wszystko';
buttonWszystkie.id = 'all-books';
sortAndFilter.appendChild(buttonWszystkie);

const buttonAddNewCategory = document.createElement('button');
buttonAddNewCategory.innerHTML = 'Dodaj Nową Kategorię';
buttonAddNewCategory.id = 'add-category';

// SORTOWANIE
const sortBooks = new Select('sort-list', 'sort-list', formState.sortBy);
const labelForsortBooks = createLabel('sort-list', 'Sortuj wg:');
const sortByList = sortBooks.createSelect();

// LICZNIK KSIĄŻEK
const booksCounterPlacer = document.createElement('div');
booksCounterPlacer.id = 'books-counter';
booksCounterPlacer.className = 'books-counter';
const collectionOfBooks = collectionOfBooksObject.getTotalCollectionOfBooks();
booksCounterPlacer.innerHTML = returnAmountOfBoks(collectionOfBooks.length);

// WYŚWIETLANIE KSIĄŻEK
const divToPlaceBookList = document.createElement('div');
divToPlaceBookList.id = 'div-books';
divToPlaceBookList.className = 'div-books';
const tableOfBooks = document.createElement('table');
tableOfBooks.id = 'book-list';
tableOfBooks.className = 'table-of-books';

const thead = document.createElement('thead');
const trNaglowek = document.createElement('tr');
const thTitle = document.createElement('th');
thTitle.innerText = 'Tytuł / Autor';
// const thAuthor = document.createElement('th');
// thAuthor.innerText = 'Autor';
const thCategory = document.createElement('th');
thCategory.innerText = 'Kategoria';
const thPriority = document.createElement('th');
thPriority.innerText = 'Priorytet';
const thPlaceholder = document.createElement('th');
thPlaceholder.innerText = '';

const locationForListOfBooks = document.createElement('tbody');

trNaglowek.append(thTitle, thCategory, thPriority, thPlaceholder);
thead.append(trNaglowek);
tableOfBooks.append(thead, locationForListOfBooks);
divToPlaceBookList.appendChild(tableOfBooks);

const totalListOfBooks = displayTotalListOfBooks(collectionOfBooks);
locationForListOfBooks.innerHTML = totalListOfBooks;

// PRZYCISK DODAJ POZYCJĘ
const addBookBtn = document.createElement('button');
addBookBtn.id = 'add-book-btn';
addBookBtn.innerText = 'Dodaj nową pozycję';

app.append(
  modalBackground,
  sortAndFilter,
  labelForsortBooks,
  sortByList,
  booksCounterPlacer,
  divToPlaceBookList,
  addBookBtn
);

// FILTROWANIE PO KATEGORII
document.getElementById('all-books').addEventListener('click', () => {
  const collectionOfBooks = collectionOfBooksObject.getTotalCollectionOfBooks();
  const totalListOfBooks = displayTotalListOfBooks(collectionOfBooks);

  collectionOfBooksObject.resetFilter();
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
      const filteredArrayOfBooks = collectionOfBooksObject.filterByCategory(category.tekst);
      collectionOfBooksObject.setFilteredOrSortedState(filteredArrayOfBooks);
      const filteredListOfBooks = displayTotalListOfBooks(filteredArrayOfBooks);
      locationForListOfBooks.innerHTML = filteredListOfBooks;
      booksCounterPlacer.innerHTML = returnAmountOfBoks(filteredArrayOfBooks.length);
    });
  }
});
sortAndFilter.appendChild(buttonAddNewCategory);

// SORTOWANIE
document.getElementById('sort-list').addEventListener('change', (event) => {
  const sortByPhrase = findObjectInArray(event.target.value, formState.sortBy);
  switch (sortByPhrase.name) {
    case 'priority':
      {
        const sortedData = collectionOfBooksObject.sortByPriority();
        const sortedListOfBooks = displayTotalListOfBooks(sortedData);
        locationForListOfBooks.innerHTML = sortedListOfBooks;
      }
      break;
    case 'author':
      {
        const sortedData = collectionOfBooksObject.sortByAuthor();
        const sortedListOfBooks = displayTotalListOfBooks(sortedData);
        locationForListOfBooks.innerHTML = sortedListOfBooks;
      }
      break;
    case 'title':
      {
        const sortedData = collectionOfBooksObject.sortByTitle();
        const sortedListOfBooks = displayTotalListOfBooks(sortedData);
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
    locationForListOfBooks.innerHTML = totalListOfBooks;
    booksCounterPlacer.innerHTML = returnAmountOfBoks(collectionOfBooks.length);
    formState.reSetState();
    formState.resetForm();
    document.getElementById('modal-background').style.display = 'none';
  } else {
    // ZAPISYWANIE EDYTOWANEJ POZYCJI
    const updatedState = collectionOfBooksObject.updateTotalCollectionOfBooks(
      formState.booksDataEnteredInForm
    );
    collectionOfBooksObject.replaceTotalBooksCollection(updatedState);
    const updatedBooksCollection = collectionOfBooksObject.getTotalCollectionOfBooks();
    localStorage.setItem('books', JSON.stringify(updatedBooksCollection));
    const totalListOfBooks = displayTotalListOfBooks(updatedBooksCollection);
    locationForListOfBooks.innerHTML = totalListOfBooks;
    booksCounterPlacer.innerHTML = returnAmountOfBoks(collectionOfBooks.length);
    formState.reSetState();
    formState.resetForm();
    document.getElementById('modal-background').style.display = 'none';
  }
});

// DELETE BOOK
locationForListOfBooks.addEventListener('click', (event) => {
  if (event.target.className === 'remove-book') {
    const newBooksList = collectionOfBooksObject.removeBookFromCollection(
      event.target.parentElement.parentElement.parentElement.dataset.id
    );
    collectionOfBooksObject.replaceTotalBooksCollection(newBooksList);
    const replacedTotalBooksCollection = collectionOfBooksObject.getTotalCollectionOfBooks();

    localStorage.setItem('books', JSON.stringify(replacedTotalBooksCollection));
    const totalListOfBooks = displayTotalListOfBooks(replacedTotalBooksCollection);
    locationForListOfBooks.innerHTML = totalListOfBooks;
    booksCounterPlacer.innerHTML = returnAmountOfBoks(replacedTotalBooksCollection.length);
  }
});

// EDYTOWANIE POZYCJI
locationForListOfBooks.addEventListener('click', (event) => {
  if (event.target.className === 'edit-book') {
    document.getElementById('modal-background').style.display = 'flex';
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

const labelsCollection = document.getElementsByClassName('radio-label');
const labelsArr = [...labelsCollection];
labelsArr.forEach((element) => {
  element.addEventListener('click', (event) => {
    event.target.parentElement.children[0].checked = true;
    formState.booksDataEnteredInForm.priority = event.target.parentElement.children[0].value;
  });
});

// EVENTY PRZYCISKÓW
document.getElementById('add-category').addEventListener('click', () => {
  document.getElementById('modal-background').style.display = 'flex';
  document.getElementById('create-category').style.display = 'flex';
});
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
    text: setCategory,
  };

  formState.addNewCategory(newCategoryObject);
  console.log(formState);
  formState.reSetNewCategory();

  // USUWANIE ELEMENTU DOM Z KATEGORIAMI
  document.getElementById('sort-and-filter').remove();

  // z tego trzeba zrobic funkcje ////////////////////////////////////////////////
  // KATEGORIE
  const sortAndFilter = document.createElement('div');
  sortAndFilter.id = 'sort-and-filter';
  sortAndFilter.className = 'sort-and-filter';

  formState.categories.forEach((category) => {
    if (category.name !== '') {
      const button = document.createElement('button');
      button.innerHTML = category.tekst;
      button.id = category.name;

      sortAndFilter.appendChild(button);
      document.getElementById(category.name).addEventListener('click', () => {
        const filteredArrayOfBooks = collectionOfBooksObject.filterByCategory(category.tekst);
        collectionOfBooksObject.setFilteredOrSortedState(filteredArrayOfBooks);
        const filteredListOfBooks = displayTotalListOfBooks(filteredArrayOfBooks);
        locationForListOfBooks.innerHTML = filteredListOfBooks;
        booksCounterPlacer.innerHTML = returnAmountOfBoks(filteredArrayOfBooks.length);
      });
    }
  });
  /// ///////////////////////////////////////////////////////////

  sortAndFilter.appendChild(buttonAddNewCategory);

  app.appendChild(sortAndFilter);

  document.getElementById('modal-background').style.display = 'none';
  document.getElementById('create-category').style.display = 'none';
});

function removePolishLetters(phrase) {
  console.log(phrase);
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
