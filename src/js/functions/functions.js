export const createLabel = (htmlForValue, descriptionText) => {
  const label = document.createElement('label');
  label.htmlFor = htmlForValue;
  const description = document.createTextNode(descriptionText);
  label.appendChild(description);
  return label;
};

export const categoriesCounter = (booksList, selectedCategory) => {
  let howManyBooksInTheCategory = 0;
  booksList.map((book) => {
    if (book.category === selectedCategory) {
      howManyBooksInTheCategory++;
    }
  });
  return howManyBooksInTheCategory;
};

export function displayTotalBooksAmountCounter(totalAmoutOfBooks, booksCounterPlacer) {
  booksCounterPlacer.innerHTML = `<p>Na liście jest ${totalAmoutOfBooks.length} książek</p>`;
}

export const printListOfCategories = (categories, totalAmoutOfBooks) => {
  let result = '<ul>';
  categories.forEach((category) => {
    if (category.name !== '') {
      result += `<li> <a class="category-counters">${category.tekst}</a> : ${categoriesCounter(
        totalAmoutOfBooks,
        category.tekst
      )}</li>`;
    }
  });
  result += '</ul>';
  return result;
};

export const printListOfBooksFromSelectedCategory = (totalAmoutOfBooks, selectedCategory) => {
  let result = '';
  totalAmoutOfBooks.forEach((book) => {
    if (book.category === selectedCategory) {
      result += `<li id=${book.id}>  
  Tytuł: ${book.title} - 
  Autor: ${book.author} 
  Kategoria: ${book.category} 
  Priorytet: ${book.priority}
  <button class="remove-book">Usuń</button>
  <button class="edit-book">Edit</button>
</li>`;
    }
  });
  return result;
};

export const displayTotalListOfBooks = (totalAmoutOfBooks) => {
  let resutl = '';
  totalAmoutOfBooks.forEach((book) => {
    resutl += `<li id=${book.id}>  
    Tytuł: ${book.title} - 
    Autor: ${book.author} 
    Kategoria: ${book.category} 
    Priorytet: ${book.priority}
    <button class="remove-book">Usuń</button>
    <button class="edit-book">Edit</button>
  </li>`;
  });
  return resutl;
};
