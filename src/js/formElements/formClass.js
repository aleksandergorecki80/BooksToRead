import { TextInput } from './textInputClass';
import { Select } from './selectClass';
import { RadioInput } from './radioInputClass';
import { Submit } from './submitClass';
import { formState } from './formState';

export class Form {
  getTitleInput() {
    const p = document.createElement('p');
    const label = createLabel('input-title', 'Tytuł');
    const titleInput = new TextInput(
      'input-title',
      'text',
      'title',
      formState.booksDataEnteredInForm.title,
      'Podaj tytuł'
    );
    const titleInputField = titleInput.createTextInput();
    p.append(label, titleInputField);
    return p;
  }

  getAuthorInput() {
    const p = document.createElement('p');
    const label = createLabel('input-author', 'Autor');
    const authorInput = new TextInput(
      'input-author',
      'text',
      'author',
      formState.booksDataEnteredInForm.author,
      'Podaj autora'
    );
    const authorInputField = authorInput.createTextInput();
    p.append(label, authorInputField);
    return p;
  }

  getSelectCategory() {
    const p = document.createElement('p');
    const label = createLabel('select-list', 'Kategoria');
    const selectCategory = new Select('select-list', 'select-list', formState.categories);
    const selectCategoryField = selectCategory.createSelect();
    p.append(label, selectCategoryField);
    return p;
  }

  getSelectPriority() {
    const p = document.createElement('p');
    const label = createLabel('select', 'Jak barszo chcesz przeczytać');
    p.appendChild(label);
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
      p.append(createdPriorityButton, label, description);
    }
    return p;
  }

  getSubmitButton() {
    const submitButton = new Submit('submit-button', 'submit', 'submit', 'Zapisz książkę');
    return submitButton.creteSubmit();
  }

  returnForm() {
    const form = document.createElement('form');
    form.id = 'form';
    const title = this.getTitleInput();
    const author = this.getAuthorInput();
    const category = this.getSelectCategory();
    const priority = this.getSelectPriority();
    const button = this.getSubmitButton();
    form.append(title, author, category, priority, button);
    return form;
  }
}

export const createLabel = (htmlForValue, descriptionText) => {
  const label = document.createElement('label');
  label.htmlFor = htmlForValue;
  const description = document.createTextNode(descriptionText);
  label.appendChild(description);
  return label;
};
