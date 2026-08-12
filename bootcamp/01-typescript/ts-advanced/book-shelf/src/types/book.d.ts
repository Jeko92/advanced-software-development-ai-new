export type EntityId = number | string;

export type Timestamped = {
  createdAt: Date;
  updatedAt: Date;
};

export type HasId = {
  id: EntityId;
};

export type BookFields = {
  title: string;
  author: string;
  isbn: string;
  isAvailable: boolean;
};

export type Book = HasId & Timestamped & BookFields;

export type IsbnParts = [number, string, string];

export type BookCreatePayload = Omit<Book, 'id' | 'createdAt' | 'updatedAt'>;
export type BookUpdatePayload = Partial<BookCreatePayload>;
export type BookPreview = Pick<Book, 'id' | 'title' | 'author'>;

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}
