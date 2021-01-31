export class BooksList {
  constructor(totalBooksCollection) {
    this.totalBooksCollection = totalBooksCollection;
    this.filteredOrSortedState = '';
  }

  setFilteredOrSortedState(state) {
    this.filteredOrSortedState = state;
  }

  gettFilteredOrSortedState() {
    return this.filteredOrSortedState;
  }

  sortByPriority() {
    return this.filteredOrSortedState.sort((a, b) => {
      return b.priority - a.priority;
    });
  }

  sortByAuthor() {
    return this.filteredOrSortedState.sort(compareAuthors);
  }

  sortByTitle() {
    return this.filteredOrSortedState.sort(compareTitles);
  }

  filterByCategory(category) {
    return this.totalBooksCollection.filter((book) => {
      if(category === book.category)
      return book;
    });
  }
}

function compareTitles(a, b) {
  if (a.title < b.title) {
    return -1;
  }
  if (a.title > b.title) {
    return 1;
  }
  return 0;
}

function compareAuthors(a, b) {
  if (a.author < b.author) {
    return -1;
  }
  if (a.author > b.author) {
    return 1;
  }
  return 0;
}
