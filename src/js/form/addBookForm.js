import { TextInput } from './formElements/textInputClass';
import { Select } from './formElements/selectClass';
import { RadioInput } from './formElements/radioInputClass';
import { Submit } from './formElements/submitClass';
import { formState } from './formState';
import { createLabel } from '../functions/functions';

export const form = {
  getTitleInput() {
    const p = document.createElement('p');
    const titleInput = new TextInput(
      'input-title',
      'text',
      'title',
      formState.booksDataEnteredInForm.title,
      'Add a title'
    );
    const titleInputField = titleInput.createTextInput();
    p.append(titleInputField);
    return p;
  },

  getAuthorInput() {
    const p = document.createElement('p');
    const authorInput = new TextInput(
      'input-author',
      'text',
      'author',
      formState.booksDataEnteredInForm.author,
      'Add an author'
    );
    const authorInputField = authorInput.createTextInput();
    p.append(authorInputField);
    return p;
  },

  getSelectCategory() {
    const p = document.createElement('p');
    const selectCategory = new Select('select-list', 'select-list', formState.categories);
    const selectCategoryField = selectCategory.createSelect();
    p.append(selectCategoryField);
    return p;
  },

  getSelectPriority() {
    const p = document.createElement('p');
    p.className = 'radio-buttons';
    const label = createLabel('select', 'How much do you want to read this book.');
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
    const submitButton = new Submit('submit-button', 'submit', 'submit', 'Save');
    const canceltButton = new Submit(
      'cancel-button',
      'button',
      'cancel',
      'Cancel',
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
