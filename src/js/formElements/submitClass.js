import { Input } from './inputClass';

export class Submit extends Input {
  creteSubmit() {
    const submit = document.createElement('input');
    submit.id = this.id;
    submit.type = this.type;
    submit.name = this.inputName;
    submit.value = this.value;
    submit.className = this.className;
    return submit;
  }
}
