export const returnAmountOfBoks = (amount) => {
  return `<p>Ilość pozycji na liście: ${amount} </p>`;
};

export const displayTotalListOfBooks = (totalAmoutOfBooks) => {
  let resutl = '';
  totalAmoutOfBooks.forEach((book) => {
    resutl += `<li data-id=${book.id}>  
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

export function resetForm() {
  document.getElementById('input-title').value = '';
  document.getElementById('input-author').value = '';
  document.getElementById('select-list').value = '-- Wybież kategorię --';
  document.getElementById('5-priority').checked = true;
}
