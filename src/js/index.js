import { v4 as uuidv4 } from 'uuid';
import { BooksList } from './books/booksListClass';
import { pageElements } from './pageElements/pageElements';
import { createLabel, functions } from './functions/functions';
import { formState } from './form/formState';
import { printAddCategoryForm } from './form/addCategoryForm';
import { form } from './form/addBookForm';
import { events } from './functions/events';

const app = document.getElementById('app');
app.className = 'app';

// INITIAL VALUE OF A BOOKS LIST
const intValue = () => {
  const localBooksData = localStorage.getItem('books');
  return localBooksData ? JSON.parse(localBooksData) : [];
};

const totalBooksCollection = intValue();
const collectionOfBooksObject = new BooksList(totalBooksCollection);
collectionOfBooksObject.resetFilter();

// IMPORTING AND CREATING DOM ELEMENTS
const modalBackground = pageElements.getModal();
// FORMULAŻ DODAWANIA NOWEJ KSIĄŻKI
const addNewBookForm = pageElements.getAddNewBookForm();
// FORMULAŻ DODAWANIA NOWEJ KATEGORII
const addCategoryForm = printAddCategoryForm();
modalBackground.append(addCategoryForm, addNewBookForm);

const addBookBtn = pageElements.getAddBookButton();
const sortAndFilter = pageElements.getCategories();
const labelForsortBooks = createLabel('sort-list', 'Sortuj wg:');
const sortByList = pageElements.getSortByOption();

const booksCounterPlacer = pageElements.getCounter(collectionOfBooksObject);
const divToPlaceBookList = pageElements.getTableOfBooksDiv(collectionOfBooksObject);
const btnAllCategories = pageElements.getBtnAllBooks();
sortAndFilter.appendChild(btnAllCategories);
pageElements.getListOfCategories(sortAndFilter);
const btnAddNewCategory = pageElements.getBtnAddNewCategory();

app.append(
  modalBackground,
  sortAndFilter,
  btnAddNewCategory,
  labelForsortBooks,
  sortByList,
  booksCounterPlacer,
  divToPlaceBookList,
  addBookBtn
);

// INITIAL FILTERED
const intFiltered = () => {
  const localFiltered = localStorage.getItem('filtered');
  return localFiltered ? JSON.parse(localFiltered) : '';
};
const initialFiltered = intFiltered();
if (initialFiltered.length > 0) {
  collectionOfBooksObject.setFilteredOrSortedState(initialFiltered);
  const collectionOfBooks = collectionOfBooksObject.gettFilteredOrSortedState();
  const htmlListOfBooks = functions.displayTotalListOfBooks(collectionOfBooks);
  functions.render(htmlListOfBooks, collectionOfBooks);
} else {
  const collectionOfBooks = collectionOfBooksObject.getTotalCollectionOfBooks();
  const htmlListOfBooks = functions.displayTotalListOfBooks(collectionOfBooks);
  functions.render(htmlListOfBooks, collectionOfBooks);
}

//  ADD A NEW BOOK BUTTON -- LISTENER
document.getElementById('add-book-btn').addEventListener('click', () => {
  document.getElementById('modal-background').style.display = 'flex';
  document.getElementById('modal-body').style.display = 'flex';
});

// CANCEL BUTTONS LISTENERS
const cancelCollection = document.getElementsByClassName('cancel-button');
const cancelArr = [...cancelCollection];
cancelArr.forEach((element) => {
  element.addEventListener('click', () => {
    document.getElementById('modal-background').style.display = 'none';
    document.getElementById('modal-body').style.display = 'none';
    document.getElementById('create-category').style.display = 'none';
    formState.reSetState();
    formState.resetForm();
  });
});

/// /  ***   ADD NEW BOOK FORM EVENT LISTENERS  ***   ///

// INPUT TITLE EVENT
document.getElementById('input-title').addEventListener('keyup', (event) => {
  const title = event.target.value;
  const titleTrimmed = title.trim();
  const validatedTitle = functions.validated(titleTrimmed);
  if (validatedTitle) {
    document.getElementById('add-book-error').innerText = '';
    formState.setTitle(titleTrimmed);
  } else {
    document.getElementById('add-book-error').innerText = 'Wypełnij formulaż';
    document.getElementById('submit-button').disabled = true;
  }
  functions.unlockSubmit(
    formState.booksDataEnteredInForm.title,
    formState.booksDataEnteredInForm.author
  );
});
// INPUT AUTHOR EVENT
document.getElementById('input-author').addEventListener('keyup', (event) => {
  const autor = event.target.value;
  const autorTrimmed = autor.trim();
  const validatedAutor = functions.validated(autorTrimmed);

  if (validatedAutor) {
    document.getElementById('add-book-error').innerText = '';
    formState.setAuthor(autorTrimmed);
  } else {
    document.getElementById('add-book-error').innerText = 'Wypełnij formulaż';
    document.getElementById('submit-button').disabled = true;
  }
  functions.unlockSubmit(
    formState.booksDataEnteredInForm.title,
    formState.booksDataEnteredInForm.author
  );
});
// SELECT LIST EVENT
events.selectListEvent();

// RADIO BUTTONS EVENT
const labelsCollection = document.getElementsByClassName('radio-label');
const labelsArr = [...labelsCollection];
labelsArr.forEach((element) => {
  element.addEventListener('click', (event) => {
    event.target.parentElement.children[0].checked = true;
    formState.setPriority(event.target.parentElement.children[0].value);
  });
});

/// /  ***   ADD NEW CATEGORY - FORM EVENT LISTENERS  ***   ///
document.getElementById('add-category').addEventListener('click', () => {
  document.getElementById('modal-background').style.display = 'flex';
  document.getElementById('create-category').style.display = 'flex';
  document.getElementById('modal-body').style.display = 'none';
});

// // ADD NEW CATEGORY
document.getElementById('input-category').addEventListener('keyup', (event) => {
  const newCategory = event.target.value;
  const trimmedNewCategory = newCategory.trim();
  const validatedNewCategory = functions.validated(trimmedNewCategory);
  if (validatedNewCategory) {
    document.getElementById('add-category-error').innerText = '';
    document.getElementById('new-category-submit-button').disabled = false;
    formState.setNewCategory(trimmedNewCategory);
  } else {
    document.getElementById('add-category-error').innerText = 'Wypełnij formulaż';
    document.getElementById('new-category-submit-button').disabled = true;
  }
});
document.getElementById('create-category').addEventListener('submit', (event) => {
  event.preventDefault();
  const setCategory = formState.getNewCategory();
  const name = functions.removePolishLetters(setCategory).toLowerCase();
  const newCategoryObject = {
    name,
    tekst: setCategory,
  };
  formState.addNewCategory(newCategoryObject);

  // REMOVING DOM ELEMENTS
  document.getElementById('sort-and-filter').remove();
  document.getElementById('select-list').parentElement.remove();

  // Rebuild categories list
  const sortAndFilter = pageElements.getCategories();
  const btnAllCategories = pageElements.getBtnAllBooks();
  sortAndFilter.appendChild(btnAllCategories);
  pageElements.getListOfCategories(sortAndFilter);
  // Rebuild select list in form
  const category = form.getSelectCategory();
  app.insertBefore(sortAndFilter, app.childNodes[0]);
  const formOnDom = document.getElementById('form');
  formOnDom.insertBefore(category, formOnDom.childNodes[2]);

  document.getElementById('modal-background').style.display = 'none';
  document.getElementById('create-category').style.display = 'none';

  events.selectListEvent();
  formState.reSetNewCategory();
  document.getElementById('input-category').value = '';
});

// //  -- SAVE, REMOVE, EDIT --
const submitForm = document.getElementById('form');
submitForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!formState.booksDataEnteredInForm.id) {
    //  SAVE NEW BOOK
    const newBookData = formState.getBooksDataEnteredInForm();
    const book = {
      id: uuidv4(),
      title: newBookData.title,
      author: newBookData.author,
      category: newBookData.category,
      priority: newBookData.priority.toString(),
    };
    collectionOfBooksObject.setTotalBooksCollection(book);
    const collectionOfBooks = collectionOfBooksObject.getTotalCollectionOfBooks();
    localStorage.setItem('books', JSON.stringify(collectionOfBooks));
    const htmlListOfBooks = functions.displayTotalListOfBooks(collectionOfBooks);

    functions.render(htmlListOfBooks, collectionOfBooks);

    document.getElementById('modal-background').style.display = 'none';
  } else {
    // SAVE EDITIED BOOK
    const updatedState = collectionOfBooksObject.updateTotalCollectionOfBooks(
      formState.booksDataEnteredInForm
    );
    collectionOfBooksObject.replaceTotalBooksCollection(updatedState);
    const updatedBooksCollection = collectionOfBooksObject.getTotalCollectionOfBooks();
    localStorage.setItem('books', JSON.stringify(updatedBooksCollection));
    const totalListOfBooks = functions.displayTotalListOfBooks(updatedBooksCollection);

    const locationForListOfBooks = document.getElementById('list-of-books');
    locationForListOfBooks.innerHTML = totalListOfBooks;
  }
  formState.reSetState();
  formState.resetForm();
  document.getElementById('submit-button').disabled = true;
  document.getElementById('modal-background').style.display = 'none';
  events.tableOfBooksLinksFilters(collectionOfBooksObject);
});
// EDITING BOOK
document.getElementById('list-of-books').addEventListener('click', (event) => {
  if (event.target.className === 'edit-book') {
    document.getElementById('submit-button').disabled = false;
    document.getElementById('modal-background').style.display = 'flex';
    document.getElementById('modal-body').style.display = 'flex';
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
// DELETE BOOK
document.getElementById('list-of-books').addEventListener('click', (event) => {
  if (event.target.className === 'remove-book') {
    const newBooksList = collectionOfBooksObject.removeBookFromCollection(
      event.target.parentElement.parentElement.parentElement.dataset.id
    );
    collectionOfBooksObject.replaceTotalBooksCollection(newBooksList);
    const replacedTotalBooksCollection = collectionOfBooksObject.getTotalCollectionOfBooks();

    localStorage.setItem('books', JSON.stringify(replacedTotalBooksCollection));
    const htmlListOfBooks = functions.displayTotalListOfBooks(replacedTotalBooksCollection);
    functions.render(htmlListOfBooks, replacedTotalBooksCollection);
  }
});

// SORTING
document.getElementById('sort-list').addEventListener('change', (event) => {
  const sortByPhrase = functions.findObjectInArray(event.target.value, formState.sortBy);
  if (collectionOfBooksObject.gettFilteredOrSortedState() === '') {
    const state = collectionOfBooksObject.getTotalCollectionOfBooks();
    collectionOfBooksObject.setFilteredOrSortedState(state);
  }

  switch (sortByPhrase.name) {
    case 'priority':
      {
        const sortedData = collectionOfBooksObject.sortByPriority();
        collectionOfBooksObject.setFilteredOrSortedState(sortedData);
        localStorage.setItem('filtered', JSON.stringify(sortedData));
        const sortedListOfBooks = functions.displayTotalListOfBooks(sortedData);
        const locationForListOfBooks = document.getElementById('list-of-books');
        locationForListOfBooks.innerHTML = sortedListOfBooks;
      }
      break;
    case 'author':
      {
        const sortedData = collectionOfBooksObject.sortByAuthor();
        collectionOfBooksObject.setFilteredOrSortedState(sortedData);
        localStorage.setItem('filtered', JSON.stringify(sortedData));
        const sortedListOfBooks = functions.displayTotalListOfBooks(sortedData);
        const locationForListOfBooks = document.getElementById('list-of-books');
        locationForListOfBooks.innerHTML = sortedListOfBooks;
      }
      break;
    case 'title':
      {
        const sortedData = collectionOfBooksObject.sortByTitle();
        collectionOfBooksObject.setFilteredOrSortedState(sortedData);
        localStorage.setItem('filtered', JSON.stringify(sortedData));
        const sortedListOfBooks = functions.displayTotalListOfBooks(sortedData);
        const locationForListOfBooks = document.getElementById('list-of-books');
        locationForListOfBooks.innerHTML = sortedListOfBooks;
      }
      break;

    default:
  }
  document.getElementById('sort-list').value = '-- Wybierz --';
});

// FILTERING
// function tableOfBooksLinksFilters() {
//   const linksClassNames = ['a-priority', 'a-author', 'a-category'];
//   linksClassNames.forEach((linkClassName) => {
//     events.linkedFilter(collectionOfBooksObject, linkClassName);
//   });
// }
events.tableOfBooksLinksFilters(collectionOfBooksObject);

// // TOP PAGES FILTERING EVENT LISTENERS
formState.categories.forEach((category) => {
  if (category.name !== '') {
    document.getElementById(category.name).addEventListener('change', (event) => {
      console.log(event.target);

      if (event.target.checked) {
        const category = formState.categories.find((category) => category.name === event.target.id);

        console.log('zaznaczony');
        console.log(category.tekst);
      } else {
        console.log('nie zaznaczony');
      }
      // const filteredArrayOfBooks = collectionOfBooksObject.filterByCategory(category.tekst);
      // collectionOfBooksObject.setFilteredOrSortedState(filteredArrayOfBooks);
      // const htmlListOfBooks = functions.displayTotalListOfBooks(filteredArrayOfBooks);
      // functions.render(htmlListOfBooks, filteredArrayOfBooks);
    });
  }
});

// formState.categories.forEach((category) => {
//   if (category.name !== '') {
//     document.getElementById(category.name).addEventListener('click', () => {
//       const filteredArrayOfBooks = collectionOfBooksObject.filterByCategory(category.tekst);
//       collectionOfBooksObject.setFilteredOrSortedState(filteredArrayOfBooks);
//       const htmlListOfBooks = functions.displayTotalListOfBooks(filteredArrayOfBooks);
//       functions.render(htmlListOfBooks, filteredArrayOfBooks);
//     });
//   }
// });

document.getElementById('all-books').addEventListener('change', (event) => {
  console.log(event.target);

  if (event.target.checked) {
    console.log('zaznaczony');
  } else {
    console.log('nie zaznaczony');
  }

  // const collectionOfBooks = collectionOfBooksObject.getTotalCollectionOfBooks();
  // const htmlListOfBooks = functions.displayTotalListOfBooks(collectionOfBooks);
  // functions.render(htmlListOfBooks, collectionOfBooks);
  // collectionOfBooksObject.resetFilter();
  // localStorage.setItem('filtered', JSON.stringify([]));
  // events.tableOfBooksLinksFilters(collectionOfBooksObject);
});

window.addEventListener('click', (e) => {
  if (e.target.id === 'modal-background') {
    document.getElementById('modal-background').style.display = 'none';
    document.getElementById('modal-body').style.display = 'none';
    document.getElementById('create-category').style.display = 'none';
  }
});

document.onkeydown = function (evt) {
  evt = evt || window.event;
  let isEscape = false;
  if ('key' in evt) {
    isEscape = evt.key === 'Escape' || evt.key === 'Esc';
  } else {
    isEscape = evt.keyCode === 27;
  }
  if (isEscape) {
    document.getElementById('modal-background').style.display = 'none';
    document.getElementById('modal-body').style.display = 'none';
    document.getElementById('create-category').style.display = 'none';
  }
};
// console.log(collectionOfBooksObject)
