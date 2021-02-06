export const returnAmountOfBoks = (amount) => {
  return `<p>Ilość pozycji na liście: ${amount} </p>`;
};

export const displayTotalListOfBooks = (totalAmoutOfBooks) => {
  let resutl = '';
  if (totalAmoutOfBooks.length === 0) {
    resutl += `<tr>
    <td colspan=5 class="colspan"> Nie znaleziono pozycji </td>
  </tr>`;
  } else {
    totalAmoutOfBooks.forEach((book) => {
      resutl += `<tr data-id=${book.id}>  
      <td class="title-author"><p class="title"> ${book.title}</p> <p class="author"> ${book.author}</p> </td>
      <td class="chategory"> ${book.category} </td>
      <td class="priority"> ${book.priority}</td>
      <td>
        <p><button class="remove-book">Usuń</button></p>
        <p><button class="edit-book">Edytuj</button></p>
      </td>
    </tr>`;
    });
  }
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
