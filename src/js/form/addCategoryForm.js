import { TextInput } from './formElements/textInputClass';
import { Submit } from './formElements/submitClass';

export const printAddCategoryForm = () => {
  const div = document.createElement('div');
  div.id = 'create-category';
  div.className = 'create-category';
  const form = document.createElement('form');
  form.id = 'add-category-form';
  const h1 = document.createElement('h3');
  h1.innerText = 'Dodaj nową kategorię';

  const titleInput = new TextInput('input-category', 'text', 'category', '', 'Wpisz nazwę');
  const categoryInput = titleInput.createTextInput();
  const p = document.createElement('p');
  p.className = 'form-buttons';
  const submitButton = new Submit('new-category-submit-button', 'submit', 'submit', 'Zapisz');
  const createdSubmit = submitButton.creteSubmit();
  const canceltButton = new Submit(
    'new-category-cancel-button',
    'button',
    'cancel',
    'Anuluj',
    'cancel-button'
  );
  const createdCancel = canceltButton.creteSubmit();
  p.append(createdSubmit, createdCancel);
  form.append(categoryInput, p);
  div.append(h1, form);
  return div;
}
