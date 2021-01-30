export class Select {
  constructor(selectName, categories) {
    this.categories = categories;
    this.selectName = selectName;
  }

  createSelect() {
    const select = document.createElement('select');
    select.name = this.selectName;
    this.categories.forEach((element) => {
      const option = document.createElement('option');
      const tekst = document.createTextNode(element.tekst);
      option.value = element.value;
      //   option.setAttribute('value', element.value);
      option.appendChild(tekst);
      select.appendChild(option);
    });
    return select;
  }
}
