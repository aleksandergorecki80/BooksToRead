export const createLabel = (htmlForValue, descriptionText) => {
  const label = document.createElement('label');
  label.htmlFor = htmlForValue;
  const description = document.createTextNode(descriptionText);
  label.appendChild(description);
  return label;
};

export const returnAmountOfBoks = (amount) => {
  return `<p>Ilość pozycji na liście: ${amount} </p>`;
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

export const findObjectInArray = (keyword, array) => {
  return array.find((element) => {
    if (keyword === element.tekst) {
      return element.name;
    }
    return null;
  });
};
