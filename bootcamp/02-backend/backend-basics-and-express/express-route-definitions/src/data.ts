export interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  isbn: string;
  genre: string;
}

export const books: Book[] = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    year: 1925,
    isbn: '978-0-7432-7356-5',
    genre: 'Classic',
  },
  {
    id: 2,
    title: '1984',
    author: 'George Orwell',
    year: 1949,
    isbn: '978-0-452-28423-4',
    genre: 'Dystopian',
  },
  {
    id: 3,
    title: 'Animal Farm',
    author: 'George Orwell',
    year: 1945,
    isbn: '978-0-452-28424-1',
    genre: 'Satire',
  },
  {
    id: 4,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    year: 1960,
    isbn: '978-0-06-112008-4',
    genre: 'Classic',
  },
  {
    id: 5,
    title: 'The Hobbit',
    author: 'J. R. R. Tolkien',
    year: 1937,
    isbn: '978-0-261-10221-7',
    genre: 'Fantasy',
  },
  {
    id: 6,
    title: "Harry Potter and the Philosopher's Stone",
    author: 'J. K. Rowling',
    year: 1997,
    isbn: '978-0-7475-3269-9',
    genre: 'Fantasy',
  },
  {
    id: 7,
    title: 'The Catcher in the Rye',
    author: 'J. D. Salinger',
    year: 1951,
    isbn: '978-0-316-76948-0',
    genre: 'Coming-of-age',
  },
  {
    id: 8,
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    year: 1813,
    isbn: '978-0-14-143951-8',
    genre: 'Romance',
  },
];
