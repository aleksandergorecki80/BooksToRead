import { formState } from '../form/formState';
import { functions } from './functions';

export const events = {
  selectListEvent: () => {
    document.getElementById('select-list').addEventListener('change', (event) => {
      formState.setCategory(event.target.value);
    });
  },
  linkedFilter: (collectionOfBooksObject, linkClassName) => {
    const linksCollection = document.getElementsByClassName(linkClassName);
    const linksArr = [...linksCollection];
    linksArr.forEach((link) => {
      link.addEventListener('click', () => {
        events.printFilteredResult(link.innerText, collectionOfBooksObject, linkClassName);
      });
    });
  },
  tableOfBooksLinksFilters: (collectionOfBooksObject) => {
    const linksClassNames = ['a-priority', 'a-author', 'a-category'];
    linksClassNames.forEach((linkClassName) => {
      events.linkedFilter(collectionOfBooksObject, linkClassName);
    });
  },
  printFilteredResult: (innerText, collectionOfBooksObject, linkClassName) => {
    let filteredArrayOfBooks = '';
    switch (linkClassName) {
      case 'a-priority':
        filteredArrayOfBooks = collectionOfBooksObject.filterByPriority(innerText);
        break;
      case 'a-author':
        filteredArrayOfBooks = collectionOfBooksObject.filterByAutor(innerText);
        break;
      case 'a-category':
        filteredArrayOfBooks = collectionOfBooksObject.filterByCategory(innerText);
        break;
      default:
    }
    collectionOfBooksObject.setFilteredOrSortedState(filteredArrayOfBooks);
    const htmlListOfBooks = functions.displayTotalListOfBooks(filteredArrayOfBooks);
    functions.render(htmlListOfBooks, filteredArrayOfBooks);
    localStorage.setItem('filtered', JSON.stringify(filteredArrayOfBooks));
    events.tableOfBooksLinksFilters(collectionOfBooksObject);
  },
};
