export const createLabel = (htmlForValue, descriptionText) => {
  const label = document.createElement('label');
  label.htmlFor = htmlForValue;
  const description = document.createTextNode(descriptionText);
  label.appendChild(description);
  return label;
};

// export remove
export const createListOfBooks = (booksList) => {
  return booksList.map((book) => {
    // const li = `<li id=${book.id}>
    //       ${book.title} - ${book.author}.
    //       category: ${book.category}
    //       jak bardzo chcę przeczytać w skali 1-5: ${book.priority} <button class=remove-book>Delete</button></li>`;
    const li = `${book.title}-${book.author}.${book.category}:${book.category}jak bardzo chcę przeczytać w skali 1-5:${book.priority}<button id=${book.id}class=remove-book>Delete</button>`;
    // const li = 'kki';

    // let li = document.createElement('li');
    // li.innerHTML = html;

    return li;
  });
};
