export type BookDetail = {
  title: string;
  subtitle: string;
  isbn: string;
  abstract: string;
  numPages: number;
  author: string;
  publisher: string;
  cover: string;
};

export type BookList = BookDetail[];
