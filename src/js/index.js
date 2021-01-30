// import * as mdb from 'mdb-ui-kit';

// export default {
//   mdb,
// };

// custom console

import { crateForm } from './form';
import { TextInput } from './textInputClass';
import { Select } from './selectClass';
import { RadioInput } from './radioInputClass';
import { createLabel } from './functions';
import { Submit } from './submitClass';

const categories = [
  { value: 'kryminal', tekst: 'Kryminał' },
  { value: 'sciFi', tekst: 'Science fiction' },
  { value: 'fantasy', tekst: 'Fantasy' },
  { value: 'poezja', tekst: 'Poezja' },
  { value: 'dramat', tekst: 'Dramat' },
  { value: 'naukiScisle', tekst: 'Nauki ścisłe' },
];

const form = crateForm();

const titleInput = new TextInput('input-title', 'text', 'title', '', 'Podaj tytuł');
const authorInput = new TextInput('input-author', 'text', 'author', '', 'Podaj autora');
const selectCategory = new Select('select-list', categories);

// const titleForAttach = title();
const app = document.getElementById('app');
form.appendChild(titleInput.createTextInput());
form.appendChild(authorInput.createTextInput());

const labelForSelect = createLabel('select-list', 'Wybierz kategorię');
const selectCategoryList = selectCategory.createSelect();
form.appendChild(labelForSelect);
form.appendChild(selectCategoryList);

const labelForRadiosList = createLabel('select', 'Jak barszo chcesz przeczytać');
form.appendChild(labelForRadiosList);
for (let i = 1; i <= 5; i++) {
  const priorityButton = new RadioInput(`${i}-priority`, 'radio', 'priority', '');
  const label = document.createElement('label');
  label.htmlFor = 'priority';
  const description = document.createTextNode(i);
  label.appendChild(description);
  form.appendChild(priorityButton.crateRadioInput());
  form.appendChild(label);
  form.appendChild(description);
}

const submitButton = new Submit('submit-button', 'submit', 'submit', 'Zapisz książkę');
form.appendChild(submitButton.creteSubmit());

app.appendChild(form);
