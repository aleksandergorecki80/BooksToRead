export function formEvents() {
    // // EVENTY FORMULAŻA
    document.getElementById('input-title').addEventListener('keyup', (event) => {
      formState.booksDataEnteredInForm.title = event.target.value;
    });
    document.getElementById('input-author').addEventListener('keyup', (event) => {
      formState.booksDataEnteredInForm.author = event.target.value;
    });
    document.getElementById('select-list').addEventListener('change', (event) => {
      formState.booksDataEnteredInForm.category = event.target.value;
    });
  
    const labelsCollection = document.getElementsByClassName('radio-label');
    const labelsArr = [...labelsCollection];
    labelsArr.forEach((element) => {
      element.addEventListener('click', (event) => {
        event.target.parentElement.children[0].checked = true;
        formState.booksDataEnteredInForm.priority = event.target.parentElement.children[0].value;
      });
    });
  }

  export function addCategoryEvent() {
      // // EVENTY PRZYCISKÓW
    document.getElementById('add-category').addEventListener('click', () => {
      document.getElementById('modal-background').style.display = 'flex';
      document.getElementById('create-category').style.display = 'flex';
      document.getElementById('modal-body').style.display = 'none';
    });
  }
  document.getElementById('add-book-btn').addEventListener('click', () => {
    document.getElementById('modal-background').style.display = 'flex';
    document.getElementById('modal-body').style.display = 'flex';
  });
  document.getElementById('cancel-button').addEventListener('click', () => {
    document.getElementById('modal-background').style.display = 'none';
    document.getElementById('modal-body').style.display = 'none';
  });
  window.addEventListener('click', (e) => {
    if (e.target.id === 'modal-background') {
      document.getElementById('modal-background').style.display = 'none';
      document.getElementById('modal-body').style.display = 'none';
      document.getElementById('create-category').style.display = 'none';
    }
  });