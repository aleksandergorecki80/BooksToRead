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

export function displayTotalBooksAmountCounter(totalBooksCollection, booksCounter) {
  booksCounter.innerHTML = `<p>Na liście jest ${totalBooksCollection.length} książek</p>`;
}

export function displayBooksAmountInCategory(number, booksCounterPlacer) {
  booksCounterPlacer.innerHTML = `<p>Na liście jest ${toString(number)} książek</p>`;
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

export const printListOfBooksFromSelectedCategory = (totalBooksCollection, selectedCategory) => {
  let result = '';
  totalBooksCollection.forEach((book) => {
    if (book.category === selectedCategory) {
      result += `<li id=${book.id}>  
  Tytuł: ${book.title} - 
  Autor: <a class="author-filter">${book.author}</a> 
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
    Autor: <a class="author-filter">${book.author} </a>
    Kategoria: ${book.category} 
    Priorytet: ${book.priority}
    <button class="remove-book">Usuń</button>
    <button class="edit-book">Edit</button>
  </li>`;
  });
  return resutl;
};