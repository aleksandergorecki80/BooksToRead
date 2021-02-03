export const returnAmountOfBoks = (amount) => {
  return `<p>Ilość pozycji na liście: ${amount} </p>`;
};

export const displayTotalListOfBooks = (totalAmoutOfBooks) => {
  let resutl = '';
  totalAmoutOfBooks.forEach((book) => {
    resutl += `<tr data-id=${book.id}>  
    <td> ${book.title} </td>
    <td> ${book.author} </td>
    <td> ${book.category} </td>
    <td> ${book.priority}</td>
    <td><button class="remove-book">Usuń</button></td>
    <td><button class="edit-book">Edit</button></td>
  </tr>`;
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
