import { TextInput } from './formElements/textInputClass';
import { Select } from './formElements/selectClass';
import { RadioInput } from './formElements/radioInputClass';
import { Submit } from './formElements/submitClass';
import { formState } from './formState';

export const form = {
  getTitleInput() {
    const p = document.createElement('p');
    // const label = createLabel('input-title', 'Tytuł');
    const titleInput = new TextInput(
      'input-title',
      'text',
      'title',
      formState.booksDataEnteredInForm.title,
      'Podaj tytuł'
    );
    const titleInputField = titleInput.createTextInput();
    // p.append(label, titleInputField);
    p.append(titleInputField);
    return p;
  },

  getAuthorInput() {
    const p = document.createElement('p');
    // const label = createLabel('input-author', 'Autor');
    const authorInput = new TextInput(
      'input-author',
      'text',
      'author',
      formState.booksDataEnteredInForm.author,
      'Podaj autora'
    );
    const authorInputField = authorInput.createTextInput();
    // p.append(label, authorInputField);
    p.append(authorInputField);
    return p;
  },

  getSelectCategory() {
    const p = document.createElement('p');
    // const label = createLabel('select-list', 'Kategoria');
    const selectCategory = new Select('select-list', 'select-list', formState.categories);
    const selectCategoryField = selectCategory.createSelect();
    // p.append(label, selectCategoryField);
    p.append(selectCategoryField);
    return p;
  },

  getSelectPriority() {
    const p = document.createElement('p');
    p.className = 'radio-buttons';
    const label = createLabel('select', 'Jak barszo chcesz przeczytać');
    label.className = 'label-for-all';
    p.appendChild(label);
    for (let i = 1; i <= 5; i++) {
      const priorityButton = new RadioInput(`${i}-priority`, 'radio', 'priority', i);
      const label = document.createElement('label');
      label.htmlFor = 'priority';
      label.className = 'radio-label';
      const description = document.createTextNode(i);

      const createdPriorityButton = priorityButton.crateRadioInput();
      const span = document.createElement('span');
      span.className = 'checkmark';
      if (i === 5) {
        createdPriorityButton.checked = true;
      }
      label.append(description, createdPriorityButton, span);
      p.appendChild(label);
    }
    return p;
  },

  getButtons() {
    const p = document.createElement('p');
    p.className = 'form-buttons';
    const submitButton = new Submit('submit-button', 'submit', 'submit', 'Zapisz');
    const canceltButton = new Submit(
      'cancel-button',
      'button',
      'cancel',
      'Anuluj',
      'cancel-button'
    );
    const createdSubmit = submitButton.creteSubmit();
    createdSubmit.disabled = true;
    const createdCancel = canceltButton.creteSubmit();
    p.append(createdSubmit, createdCancel);
    return p;
  },

  returnForm() {
    const form = document.createElement('form');
    form.id = 'form';
    form.className = 'form';
    const title = this.getTitleInput();
    const author = this.getAuthorInput();
    const category = this.getSelectCategory();
    const priority = this.getSelectPriority();
    const buttons = this.getButtons();
    const error = document.createElement('p');
    error.id = 'add-book-error';
    error.className = 'error';
    form.append(title, author, category, priority, error, buttons);
    return form;
  },
};

export const createLabel = (htmlForValue, descriptionText) => {
  const label = document.createElement('label');
  label.htmlFor = htmlForValue;
  const description = document.createTextNode(descriptionText);
  label.appendChild(description);
  return label;
};
