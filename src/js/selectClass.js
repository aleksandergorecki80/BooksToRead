export class Select {
  constructor(categories) {
    this.categories = categories;
  }

  createSelect() {
    const select = document.createElement('select');
    this.categories.forEach((element) => {
      const option = document.createElement('option');
      const tekst = document.createTextNode(element.tekst);
      option.setAttribute('value', element.value);
      option.appendChild(tekst);
      select.appendChild(option);
    });
    return select;
  }
}
