export class BooksList {
  constructor(totalBooksCollection) {
    this.totalBooksCollection = totalBooksCollection;
    this.filteredOrSortedState = '';
    this.categoryFilters = '';
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

  removeBookFromCollection(id) {
    return this.totalBooksCollection.filter((book) => {
      return book.id !== id;
    });
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

  addCategoryToFiltersGroup(category) {
    this.categoryFilters = [...this.categoryFilters, category];
  }

  removeCategoryFromFiltersGroup(category) {
    this.categoryFilters = this.categoryFilters.filter((filter) => filter !== category);
  }

  filterByMultipleCategories() {
    let filtered = [];
    this.categoryFilters.forEach((filterBy) => {
      const filteredOnce = this.totalBooksCollection.filter((book) => {
        return book.category === filterBy;
      });
      filtered = [...filtered, ...filteredOnce];
    });
    return filtered;
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

  filterByPriority(priority) {
    return this.totalBooksCollection.filter((book) => {
      if (priority === book.priority) return book;
      return null;
    });
  }

  filterByAutor(author) {
    return this.totalBooksCollection.filter((book) => {
      if (author === book.author) return book;
      return null;
    });
  }

  filterByCategory(category) {
    return this.totalBooksCollection.filter((book) => {
      if (category === book.category) return book;
      return null;
    });
  }

  resetFilter() {
    this.filteredOrSortedState = '';
    this.categoryFilters = '';
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
