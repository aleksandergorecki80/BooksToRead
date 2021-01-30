import { Input } from './inputClass';

export class Submit extends Input {
  creteSubmit() {
    const submit = document.createElement('input');
    submit.type = this.type;
    submit.value = this.value;
    return submit;
  }
}
