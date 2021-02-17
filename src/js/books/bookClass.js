import { v4 as uuidv4 } from 'uuid';

export class Book {
  constructor(title, author, category, priority) {
    this.id = uuidv4();
    this.title = title;
    this.author = author;
    this.category = category;
    this.priority = priority;
  }
}
