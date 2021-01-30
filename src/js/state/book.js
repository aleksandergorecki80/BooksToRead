export class Book {
  constructor(title, author, category, priority) {
    this.title = title;
    this.author = author;
    this.category = category;
    this.priority = priority;
  }
  buildNewBook() {
    const li = document.createElement('li');
    li.innerHTML = `
      ${this.title} - ${this.author}. 
      category: ${this.category}
      jak bardzo chcę przeczytać w skali 1-5: ${this.priority}
      `;
    return li;
  }
}
