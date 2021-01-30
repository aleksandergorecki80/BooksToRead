import { Input } from './inputClass';

export class RadioInput extends Input {
  //   constructor(id, type, inputName, value) {
  //     super(id, type, inputName, value);
  //   }

  crateRadioInput() {
    const radio = document.createElement('input');
    radio.id = this.id;
    radio.type = this.type;
    radio.name = this.inputName;
    radio.value = this.value;
    return radio;
  }
}
