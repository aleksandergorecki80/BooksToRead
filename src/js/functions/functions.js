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

export const displayHowManyBooksInCategories = (
  howManyCryminals,
  howManySciFi,
  howManyFantasy,
  howManyPoezja,
  howManyDramat,
  howManyNaukiScisle
) => {
  return `<button class=category-counters>Kryminały</button>: ${howManyCryminals}
  <button class=category-counters>Science fiction</button>: ${howManySciFi}
  <button class=category-counters>Fantasy</button>: ${howManyFantasy}
  <button class=category-counters>Poezja</button>: ${howManyPoezja}
  <button class=category-counters>Dramat</button>: ${howManyDramat}
  <button class=category-counters>Nauki ścisłe</button>: ${howManyNaukiScisle}
          `;
};
