export class Input {
  constructor(type, inputName) {
    this.type = type;
    this.inputName = inputName;
  }
}

export class TextInput extends Input {
  constructor(type, inputName, placeholder) {
    super(type, inputName);
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

export class RadioInput extends Input {
  constructor(type, inputName) {
    super(type, inputName);
  }
}
