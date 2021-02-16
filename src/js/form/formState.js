import { Submit } from './formElements/submitClass';
import { TextInput } from './formElements/textInputClass';

export const formState = {
  addedCategory: '',
  sortBy: [
    { name: '', tekst: '-- Wybierz --' },
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
  setCategory(data) {
    this.addedCategory = data;
  },
  getSetCategory() {
    return this.addedCategory;
  },
  addNewCategory(newCategory) {
    this.categories = [...this.categories, newCategory];
  },
  reSetNewCategory() {
    this.addedCategory = '';
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
    document.getElementById('select-list').value = '-- Wybież kategorię --';
    document.getElementById('5-priority').checked = true;
  },

  printAddingCategoryForm() {
    const div = document.createElement('div');
    div.id = 'create-category';
    div.className = 'create-category';
    const form = document.createElement('form');
    form.id = 'add-category-form';
    const h1 = document.createElement('h3');
    h1.innerText = 'Dodaj nową kategorię';

    const titleInput = new TextInput('input-category', 'text', 'category', '', 'Wpisz nazwę');
    const categoryInput = titleInput.createTextInput();
    const p = document.createElement('p');
    p.className = 'form-buttons';
    const submitButton = new Submit('new-category-submit-button', 'submit', 'submit', 'Zapisz');
    const createdSubmit = submitButton.creteSubmit();
    const canceltButton = new Submit(
      'new-category-cancel-button',
      'button',
      'cancel',
      'Anuluj',
      'cancel-button'
    );
    const createdCancel = canceltButton.creteSubmit();
    p.append(createdSubmit, createdCancel);
    form.append(categoryInput, p);
    div.append(h1, form);
    return div;
  },
};
