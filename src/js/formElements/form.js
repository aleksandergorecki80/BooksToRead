import { TextInput } from './textInputClass';
import { Select } from './selectClass';
import { RadioInput } from './radioInputClass';
import { Submit } from './submitClass';
import { booksDataEnteredInForm } from '../events/evants';
import { categories } from '../state/state';
import { createLabel } from '../functions/functions';

export const crateForm = () => {
  const form = document.createElement('form');
  form.id = 'form';
  return form;
};

export function displayForm() {
  // Formulaż
  const form = crateForm();
  const divToPlaceFor = document.createElement('div');
  divToPlaceFor.id = 'div-form';

  const titleInput = new TextInput(
    'input-title',
    'text',
    'title',
    booksDataEnteredInForm.title,
    'Podaj tytuł'
  );
  const authorInput = new TextInput(
    'input-author',
    'text',
    'author',
    booksDataEnteredInForm.author,
    'Podaj autora'
  );
  form.appendChild(titleInput.createTextInput());
  form.appendChild(authorInput.createTextInput());

  const selectCategory = new Select('select-list', 'select-list', categories);
  const labelForSelect = createLabel('select-list', 'Wybierz kategorię');
  const selectCategoryList = selectCategory.createSelect();
  form.appendChild(labelForSelect);
  form.appendChild(selectCategoryList);

  const labelForRadiosList = createLabel('select', 'Jak barszo chcesz przeczytać');
  form.appendChild(labelForRadiosList);
  for (let i = 1; i <= 5; i++) {
    const priorityButton = new RadioInput(`${i}-priority`, 'radio', 'priority', i);
    const label = document.createElement('label');
    label.htmlFor = 'priority';
    const description = document.createTextNode(i);
    label.appendChild(description);
    const createdPriorityButton = priorityButton.crateRadioInput();
    if (i === 5) {
      createdPriorityButton.checked = true;
    }
    form.appendChild(createdPriorityButton);
    form.appendChild(label);
    form.appendChild(description);
  }

  const submitButton = new Submit('submit-button', 'submit', 'submit', 'Zapisz książkę');
  form.appendChild(submitButton.creteSubmit());
  divToPlaceFor.appendChild(form);
  const app = document.getElementById('app');
  app.appendChild(divToPlaceFor);
}

export function resetForm() {
  document.getElementById('input-title').value = '';
  document.getElementById('input-author').value = '';
  document.getElementById('select-list').value = ' -- Wybież kategorię -- ';
  document.getElementById('5-priority').checked = true;
}
