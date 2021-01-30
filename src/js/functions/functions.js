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
      'afterbegin',
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
