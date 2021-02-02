import { Input } from './inputClass';

export class TextInput extends Input {
  constructor(id, type, inputName, value, placeholder) {
    super(id, type, inputName, value);
    this.placeholder = placeholder;
  }

  createTextInput() {
    const input = document.createElement('input');
    input.id = this.id;
    input.type = this.type;
    input.name = this.inputName;
    input.value = this.value;
    input.placeholder = this.placeholder;
    return input;
  }
}
