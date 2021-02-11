const { functions } = require('../js/functions/functions');

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
