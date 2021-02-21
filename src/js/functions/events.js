import { formState } from '../form/formState';
import { functions } from './functions';

export const events = {
  selectListEvent: () => {
    document.getElementById('select-list').addEventListener('change', (event) => {
      console.log(event.target.value, 'selectList');
      formState.setCategory(event.target.value);
      // unlockSubmit();
    });
  },
  priorityFilter: (collectionOfBooksObject) => {
    const priorityLinksCollection = document.getElementsByClassName('a-priority');
    const priorityLinksArr = [...priorityLinksCollection];
    priorityLinksArr.forEach((priority) => {
      priority.addEventListener('click', () => {
        // console.log(collectionOfBooksObject, 'collectionOfBooksObject');
        console.log(priority, 'priority');

        printFilteredPriorities(priority.innerText, collectionOfBooksObject);
      });
    });
  },
};


function printFilteredPriorities(priorityInnerText, collectionOfBooksObject) {
  const filteredArrayOfBooks = collectionOfBooksObject.filterByPriority(priorityInnerText);
  collectionOfBooksObject.setFilteredOrSortedState(filteredArrayOfBooks);
  const htmlListOfBooks = functions.displayTotalListOfBooks(filteredArrayOfBooks);
  render(htmlListOfBooks, filteredArrayOfBooks);
}

function render(htmlListOfBooks, filteredArrayOfBooks) {
  const locationForListOfBooks = document.getElementById('list-of-books');
  locationForListOfBooks.innerHTML = htmlListOfBooks;
  const booksCounterPlacer = document.getElementById('books-counter');
  booksCounterPlacer.innerHTML = functions.returnAmountOfBoks(filteredArrayOfBooks.length);
}