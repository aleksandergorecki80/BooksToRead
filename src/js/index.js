// import * as mdb from 'mdb-ui-kit';

// export default {
//   mdb,
// };

// custom console

import { crateForm } from './form';
import { TextInput } from './inputClass';
import { Select } from './selectClass';

const categories = [
  { value: 'kryminal', tekst: 'Kryminał' },
  { value: 'sciFi', tekst: 'Science fiction' },
  { value: 'fantasy', tekst: 'Fantasy' },
  { value: 'poezja', tekst: 'Poezja' },
  { value: 'dramat', tekst: 'Dramat' },
  { value: 'naukiScisle', tekst: 'Nauki ścisłe' },
];

const form = crateForm();

const titleInput = new TextInput('text', 'Title', 'Podaj tytuł');
const authorInput = new TextInput('text', 'Author', 'Podaj autora');
const selectCategory = new Select(categories);

// const titleForAttach = title();
const app = document.getElementById('app');
form.appendChild(titleInput.createInput());
form.appendChild(authorInput.createInput());
form.appendChild(selectCategory.createSelect());
app.appendChild(form);
