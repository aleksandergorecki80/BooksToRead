export const formState = {
  sortBy: [
    { name: '', tekst: ' -- Wybierz --' },
    { name: 'title', tekst: 'Tytuł' },
    { name: 'author', tekst: 'Autor' },
    { name: 'priority', tekst: 'Priorytet' },
  ],
  categories: [
    { name: '', tekst: ' -- Wybież kategorię -- ' },
    { name: 'kryminal', tekst: 'Kryminał' },
    { name: 'sciFi', tekst: 'Science fiction' },
    { name: 'fantasy', tekst: 'Fantasy' },
    { name: 'poezja', tekst: 'Poezja' },
    { name: 'dramat', tekst: 'Dramat' },
    { name: 'naukiScisle', tekst: 'Nauki ścisłe' },
  ],
  booksDataEnteredInForm: {
    id: '',
    title: '',
    author: '',
    category: '',
    priority: 5,
  },
  reSetState() {
    this.id = '';
    this.title = '';
    this.author = '';
    this.priority = '';
  },
  updateBooksDataEnteredInForm(dataToEdition) {
    this.booksDataEnteredInForm.id = dataToEdition.id;
    this.booksDataEnteredInForm.title = dataToEdition.title;
    this.booksDataEnteredInForm.author = dataToEdition.author;
    this.booksDataEnteredInForm.priority = dataToEdition.priority;
  },
  resetForm() {
    document.getElementById('input-title').value = '';
    document.getElementById('input-author').value = '';
    document.getElementById('select-list').value = '-- Wybież kategorię --';
    document.getElementById('5-priority').checked = true;
  },
};
