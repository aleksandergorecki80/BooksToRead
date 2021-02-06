// import { formState } from '../formElements/formState';

// export function categoriesFilters() {
//   // // FILTROWANIE PO KATEGORII
//   formState.categories.forEach((category) => {
//     if (category.name !== '') {
//       document.getElementById(category.name).addEventListener('click', () => {
//         const filteredArrayOfBooks = collectionOfBooksObject.filterByCategory(category.tekst);
//         collectionOfBooksObject.setFilteredOrSortedState(filteredArrayOfBooks);
//         const filteredListOfBooks = displayTotalListOfBooks(filteredArrayOfBooks);
//         const locationForListOfBooks = document.getElementById('list-of-books');
//         locationForListOfBooks.innerHTML = filteredListOfBooks;
//         booksCounterPlacer.innerHTML = returnAmountOfBoks(filteredArrayOfBooks.length);
//       });
//     }
//   });

//   document.getElementById('all-books').addEventListener('click', () => {
//     const collectionOfBooks = collectionOfBooksObject.getTotalCollectionOfBooks();
//     const totalListOfBooks = displayTotalListOfBooks(collectionOfBooks);

//     collectionOfBooksObject.resetFilter();
//     const locationForListOfBooks = document.getElementById('list-of-books');
//     locationForListOfBooks.innerHTML = totalListOfBooks;
//     booksCounterPlacer.innerHTML = returnAmountOfBoks(collectionOfBooks.length);
//   });
// }
