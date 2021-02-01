export const sortBy = [
  { name: '', tekst: ' -- Wybierz --' },
  { name: 'title', tekst: 'Tytuł' },
  { name: 'author', tekst: 'Autor' },
  { name: 'priority', tekst: 'Priorytet' },
];

export const categories = [
  { name: '', tekst: ' -- Wybież kategorię -- ' },
  { name: 'kryminal', tekst: 'Kryminał' },
  { name: 'sciFi', tekst: 'Science fiction' },
  { name: 'fantasy', tekst: 'Fantasy' },
  { name: 'poezja', tekst: 'Poezja' },
  { name: 'dramat', tekst: 'Dramat' },
  { name: 'naukiScisle', tekst: 'Nauki ścisłe' },
];

export const booksDataEnteredInForm = {
  id: '',
  title: '',
  author: '',
  category: '',
  priority: 5,
};

export function updateBooksDataEnteredInForm(dataToEdition) {
  booksDataEnteredInForm.id = dataToEdition.id;
  booksDataEnteredInForm.title = dataToEdition.title;
  booksDataEnteredInForm.author = dataToEdition.author;
  booksDataEnteredInForm.priority = dataToEdition.priority;
}

export function formFieldEvents() {
  // Eventy dla selectów w formulazu
  document.getElementById('input-title').addEventListener('keyup', (event) => {
    booksDataEnteredInForm.title = event.target.value;
  });
  document.getElementById('input-author').addEventListener('keyup', (event) => {
    booksDataEnteredInForm.author = event.target.value;
  });
  document.getElementById('select-list').addEventListener('change', (event) => {
    booksDataEnteredInForm.category = event.target.value;
  });
  const radios = document.querySelectorAll('input[type=radio]');
  radios.forEach((radio) => {
    radio.addEventListener('change', (event) => {
      booksDataEnteredInForm.priority = event.target.value;
    });
  });
}