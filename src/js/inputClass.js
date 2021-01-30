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
