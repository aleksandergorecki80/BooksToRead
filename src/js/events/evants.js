export const booksDataEnteredInForm = {
  id: '',
  title: '',
  author: '',
  category: '',
  priority: '',
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

export const findUpdatedPositionAndUpdate = (totalBooksCollection, bookData) => {
  return totalBooksCollection.map((bookOnList) => {
    if (bookOnList.id === bookData.id) {
      return {
        id: bookData.id,
        title: bookData.title,
        author: bookData.author,
        category: bookData.category,
        priority: bookData.priority,
      };
    }
    return bookOnList;
  });
};
