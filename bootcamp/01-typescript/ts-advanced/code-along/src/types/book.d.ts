export type EntityId = number | string;

export interface Book {
  id: EntityId;
  title: string;
  author: string;
  isbn: string;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type BookCreatePayload = Omit<Book, 'id' | 'createdAt' | 'updatedAt'>;
export type BookUpdatePayload = Partial<BookCreatePayload>;
export type BookPreview = Pick<Book, 'id' | 'title' | 'author'>;

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}
