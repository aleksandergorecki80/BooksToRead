export let newBook = {
  title: '',
  author: '',
  category: '',
  priority: '',
};

export function updateNewBook(dataToEdition) {
  newBook.title = dataToEdition.title;
  console.log(newBook);
}

export function formFieldEvents() {
  // Eventy dla selectów w formulazu
  document.getElementById('input-title').addEventListener('keyup', (event) => {
    newBook.title = event.target.value;
  });
  document.getElementById('input-author').addEventListener('keyup', (event) => {
    newBook.author = event.target.value;
  });
  document.getElementById('select-list').addEventListener('change', (event) => {
    newBook.category = event.target.value;
  });
  const radios = document.querySelectorAll('input[type=radio]');
  radios.forEach((radio) => {
    radio.addEventListener('change', (event) => {
      newBook.priority = event.target.value;
    });
  });
}


