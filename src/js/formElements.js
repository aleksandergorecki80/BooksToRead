export class Input {
  constructor(type, name, placeholder) {
    this.type = type;
    this.name = name;
    this.placeholder = placeholder;
  }

  createInput() {
    const input = document.createElement('input');
    input.setAttribute('type', this.type);
    input.setAttribute('name', this.name);
    input.setAttribute('placeholder', this.placeholder);
    return input;
  }
}

export class Select {
  // constructor(type, name, placeholder) {
  //   this.type = type;
  //   this.name = name;
  //   this.placeholder = placeholder;
  // }

  createSelect() {
    const select = document.createElement('select');

    
    
    data.forEach((element)=> {
      const option = document.createElement('option');
      const tekst = document.createTextNode(element.tekst);
      option.setAttribute('value', element.value);
      option.appendChild(tekst);
      select.appendChild(option);
    })
    

    return select;
  }
}
