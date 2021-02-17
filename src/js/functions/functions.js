export const functions = {
  returnAmountOfBoks: (amount) => {
    return `<p>Ilość książek na liście: ${amount} </p>`;
  },
  findObjectInArray: (keyword, array) => {
    return array.find((element) => {
      return keyword === element.tekst;
    });
  },
  validated: (phrase) => {
    return phrase !== '';
  },
  unlockSubmit: (title, author) => {
    if (title && author) {
      document.getElementById('submit-button').disabled = false;
    } else {
      document.getElementById('submit-button').disabled = true;
    }
  },
};

export const createLabel = (htmlForValue, descriptionText) => {
  const label = document.createElement('label');
  label.htmlFor = htmlForValue;
  const description = document.createTextNode(descriptionText);
  label.appendChild(description);
  return label;
};

// export const returnAmountOfBoks = (amount) => {
//   return `<p>Ilość książek na liście: ${amount} </p>`;
// };

export const displayTotalListOfBooks = (totalAmoutOfBooks) => {
  let resutl = '';
  if (totalAmoutOfBooks.length === 0) {
    resutl += `<tr>
    <td colspan=5 class="colspan"> Nie znaleziono pozycji </td>
  </tr>`;
  } else {
    totalAmoutOfBooks.forEach((book) => {
      resutl += `<tr data-id=${book.id} draggable="true">  
      <td class="title-author" ><p class="title"> ${book.title}</p> <p class="author"><a class="a-author"> ${book.author}</a></p> </td>
      <td class="category"><a class="a-category"> ${book.category} </a></td>
      <td class="priority"> <a class="a-priority">${book.priority}</a></td>
      <td>
        <p><button class="remove-book">Usuń</button></p>
        <p><button class="edit-book">Edytuj</button></p>
      </td>
      </tr>`;
    });
  }
  return resutl;
};

// export const findObjectInArray = (keyword, array) => {
//   return array.find((element) => {
//     if (keyword === element.tekst) {
//       return element.name;
//     }
//     return null;
//   });
// };

export function resetForm() {
  document.getElementById('input-title').value = '';
  document.getElementById('input-author').value = '';
  document.getElementById('select-list').value = '-- Wybież kategorię --';
  document.getElementById('5-priority').checked = true;
}

export function removePolishLetters(phrase) {
  const polskie = [
    'ą',
    'ć',
    'ę',
    'ł',
    'ń',
    'ó',
    'ś',
    'ź',
    'ż',
    'Ą',
    'Ć',
    'Ę',
    'Ł',
    'Ń',
    'Ó',
    'Ś',
    'Ź',
    'Ż',
    ' ',
  ];
  const niepolskie = [
    'a',
    'c',
    'e',
    'l',
    'n',
    'o',
    's',
    'z',
    'z',
    'A',
    'C',
    'L',
    'N',
    'O',
    'S',
    'Z',
    'Z',
    '',
  ];
  const arr = [...phrase];
  const newArr = arr.map((element) => {
    polskie.find((znak) => {
      if (znak === element) {
        element = niepolskie[polskie.indexOf(znak)];
      }
    });
    return element;
  });
  const nowyWyraz = newArr.join('');
  return nowyWyraz;
}
