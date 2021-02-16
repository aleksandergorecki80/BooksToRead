const { functions } = require('../js/functions/functions');
const { BooksList } = require('../js/classes/booksListClass');


test('shoud return a string with a given number', () => {
  const result = functions.returnAmountOfBoks(29);
  expect(result).toBe('<p>Ilość książek na liście: 29 </p>');
});

describe('finding an object in an array by given phrase', () => {
  const array = [
    { name: '', tekst: '-- Wybierz --' },
    { name: 'title', tekst: 'Tytuł' },
    { name: 'author', tekst: 'Autor' },
    { name: 'priority', tekst: 'Priorytet' },
  ];

  it('should return an object if found', () => {
    const keyword = 'Tytuł';
    const result = functions.findObjectInArray(keyword, array);
    expect(result).toEqual({ name: 'title', tekst: 'Tytuł' });
  });
  it('should return undefined if not found', () => {
    const keyword = 'Kategoria';
    const result = functions.findObjectInArray(keyword, array);
    expect(result).toBeUndefined();
  });
});

describe('testing books list class', ()=>{
  const egzistingCollection = [{
    id: 1,
    title:"Potop",
    author: "Mickiewicz",
    category: "Dramat",
    priority: 1
  }];
  const bookToAdd = {
    id: 2,
    title:"Pan Tadeusz",
    author: "Sienkiewicz",
    category: "Poezja",
    priority: 5
  }
  const bookListObj = new BooksList(egzistingCollection);
  const collectionWithNewBook = bookListObj.setTotalBooksCollection(bookToAdd);
  console.log(collectionWithNewBook)
  // it('should add a new book to the egzisting collection', () =>{
  //   const collectionWithNewBook = bookListObj.setTotalBooksCollection(bookToAdd);
  //   expect(collectionWithNewBook).toMatchObject(expect.arrayContaining(bookToAdd));
  // });
})
