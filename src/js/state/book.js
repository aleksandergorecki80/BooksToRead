import { v4 as uuidv4 } from 'uuid';

export class Book {
  constructor(title, author, category, priority) {
    this.id = uuidv4();
    this.title = title;
    this.author = author;
    this.category = category;
    this.priority = priority;
  }

  buildNewBook() {
    let li = document.createElement('li');
    li = `
      ${this.title} - ${this.author}. 
      category: ${this.category}
      jak bardzo chcę przeczytać w skali 1-5: ${this.priority}
      <button class="remove">Delete</button>
      `;
    //  li.appendChild(deleteBook.creteSubmit());
    return li;
  }
}
