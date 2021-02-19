import { formState } from '../form/formState';

export const events = {
  selectListEvent: () => {
    document.getElementById('select-list').addEventListener('change', (event) => {
      console.log(event.target.value, 'selectList');
      formState.setCategory(event.target.value);
      // unlockSubmit();
    });
  },
};
