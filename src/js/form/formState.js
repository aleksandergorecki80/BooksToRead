export const formState = {
  newCategory: '',
  sortBy: [
    { name: '', tekst: '-- Select --' },
    { name: 'title', tekst: 'Title' },
    { name: 'author', tekst: 'Author' },
    { name: 'priority', tekst: 'Priority' },
  ],
  categories: [
    { name: '', tekst: ' -- Select a category -- ' },
    { name: 'kryminal', tekst: 'Crime fiction' },
    { name: 'sciFi', tekst: 'Science fiction' },
    { name: 'fantasy', tekst: 'Fantasy' },
    { name: 'poezja', tekst: 'Poetry' },
    { name: 'dramat', tekst: 'Drama' },
    { name: 'naukiScisle', tekst: 'Science' },
  ],
  booksDataEnteredInForm: {
    id: '',
    title: '',
    author: '',
    category: '',
    priority: '5',
  },

  // NEW BOOK SECTION
  setPriority(value) {
    this.booksDataEnteredInForm.priority = value;
  },
  setTitle(value) {
    this.booksDataEnteredInForm.title = value;
  },
  setAuthor(value) {
    this.booksDataEnteredInForm.author = value;
  },
  setCategory(value) {
    this.booksDataEnteredInForm.category = value;
  },
  getBooksDataEnteredInForm() {
    return this.booksDataEnteredInForm;
  },
  /// NEW CATEGORY SECTION
  setNewCategory(data) {
    this.newCategory = data;
  },
  getNewCategory() {
    return this.newCategory;
  },
  addNewCategory(newCategory) {
    this.categories = [...this.categories, newCategory];
  },
  reSetNewCategory() {
    this.newCategory = '';
  },
  reSetState() {
    this.booksDataEnteredInForm.id = '';
    this.booksDataEnteredInForm.title = '';
    this.booksDataEnteredInForm.author = '';
    this.booksDataEnteredInForm.category = '';
    this.booksDataEnteredInForm.priority = 5;
  },
  updateBooksDataEnteredInForm(dataToEdition) {
    this.booksDataEnteredInForm.id = dataToEdition.id;
    this.booksDataEnteredInForm.title = dataToEdition.title;
    this.booksDataEnteredInForm.author = dataToEdition.author;
    this.booksDataEnteredInForm.category = dataToEdition.category;
    this.booksDataEnteredInForm.priority = dataToEdition.priority;
  },
  resetForm() {
    document.getElementById('input-title').value = '';
    document.getElementById('input-author').value = '';
    document.getElementById('select-list').value = '-- Select a category --';
    document.getElementById('5-priority').checked = true;
  },
};
