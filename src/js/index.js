// import * as mdb from 'mdb-ui-kit';

// export default {
//   mdb,
// };

// custom console

import { crateForm } from './form';
import { Input, Select } from './formElements';

const data = [
    {value: 'kryminał', tekst: 'Kryminał'}, 
    {value: 'kryminał', tekst: 'Kryminał'},]

const form = crateForm();

const titleInput = new Input('text', 'Title', 'Podaj tytuł');
const authorInput = new Input('text', 'Author', 'Podaj autora');
const selectCategory = new Select();

// const titleForAttach = title();
const app = document.getElementById('app');
form.appendChild(titleInput.createInput());
form.appendChild(authorInput.createInput());
form.appendChild(selectCategory.createSelect());
app.appendChild(form);
