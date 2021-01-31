export const createLabel = (htmlForValue, descriptionText) => {
  const label = document.createElement('label');
  label.htmlFor = htmlForValue;
  const description = document.createTextNode(descriptionText);
  label.appendChild(description);
  return label;
};

// export remove
export const printListOfBooks = (books, place) => {
  return books.map((book) => {
    place.insertAdjacentHTML(
      'beforeend',
      `<li id=${book.id}>  
          Tytuł: ${book.title} - 
          Autor: ${book.author} 
          Kategoria: ${book.category} 
          Priorytet: ${book.priority}
          <button class="remove-book">Usuń</button>
       </li>`
    );
  });
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
    if (category.value !== '') {
      result += `<li> <a href=# class=category-counters>${category.tekst}</a> : ${categoriesCounter(
        totalAmoutOfBooks,
        category.tekst
      )}</li>`;
    }
  });
  result += '</ul>';
  return result;
};
