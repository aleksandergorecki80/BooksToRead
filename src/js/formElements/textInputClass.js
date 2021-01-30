import { Input } from './inputClass';

export class TextInput extends Input {
  constructor(id, type, inputName, value, placeholder) {
    super(id, type, inputName, value);
    this.placeholder = placeholder;
  }

  createTextInput() {
    const input = document.createElement('input');
    // input.setAttribute('type', this.type);
    input.id = this.id;
    input.type = this.type;
    input.name = this.inputName;
    input.value = this.value;
    input.placeholder = this.placeholder;
    // input.setAttribute('name', this.inputName);
    // input.setAttribute('value', this.value);
    // input.setAttribute('placeholder', this.placeholder);
    return input;
  }
}
