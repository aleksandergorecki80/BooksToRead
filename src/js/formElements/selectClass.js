export class Select {
  constructor(id, selectName, categories) {
    this.id = id;
    this.categories = categories;
    this.selectName = selectName;
  }

  createSelect() {
    const select = document.createElement('select');
    select.id = this.id;
    select.name = this.selectName;
    this.categories.forEach((element) => {
      const option = document.createElement('option');
      const tekst = document.createTextNode(element.tekst);
      option.value = element.name;

      //   option.setAttribute('value', element.value);

      if (element.value === '') {
        option.disabled = true;
        option.selected = true;
      }
      option.appendChild(tekst);
      select.appendChild(option);
    });
    return select;
  }
}
