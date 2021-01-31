export class BooksList {
  constructor(totalBooksCollection) {
    this.totalBooksCollection = totalBooksCollection;
    this.filteredOrSortedState = '';
  }

  getTotalCollectionOfBooks() {
    return this.totalBooksCollection;
  }

  setTotalBooksCollection(data) {
    this.totalBooksCollection = [...this.totalBooksCollection, data];
  }

  replaceTotalBooksCollection(data) {
    this.totalBooksCollection = data;
  }

  gettFilteredOrSortedState() {
    return this.filteredOrSortedState;
  }

  setFilteredOrSortedState(state) {
    this.filteredOrSortedState = state;
  }

  updateTotalCollectionOfBooks(data) {
    return this.totalBooksCollection.map((bookOnList) => {
      if (bookOnList.id === data.id) {
        return {
          id: data.id,
          title: data.title,
          author: data.author,
          category: data.category,
          priority: data.priority,
        };
      }
      return bookOnList;
    });
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
      if (category === book.category) return book;
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
