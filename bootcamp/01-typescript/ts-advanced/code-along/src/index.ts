/*******************************************************/
/* TypeScript Advanced - Intersection Types and Tuples */
/*******************************************************/

// Intersection types
type HasId = {
  id: string;
};

type Timestamped = {
  createdAt: Date;
  updatedAt: Date;
};

type BookFields = {
  title: string;
  author: string;
  isbn: string;
  isAvailable: boolean;
};

type Book = HasId & Timestamped & BookFields;

const book: Book = {
  id: '1',
  createdAt: new Date(),
  updatedAt: new Date(),
  title: 'Clean Code',
  author: 'Robert C. Martin',
  isbn: '978-0132350884',
  isAvailable: true,
};

console.log('Book: ', book);

type AuthorFields = {
  name: string;
  bio: string;
};

type Author = HasId & Timestamped & AuthorFields;
const author: Author = {
  id: '1',
  createdAt: new Date(),
  updatedAt: new Date(),
  name: 'Robert C. Martin',
  bio: 'American software engineer and author known for Clean Code, Clean Architecture, and his contributions to software craftsmanship.',
};

console.log('Author: ', author);

// Intersection types vs union types
console.log('============================================');
console.log('======intersection types vs union types=====');
console.log('============================================');

// UNION: string OR number
type StringOrNumber = string | number;

const value1: StringOrNumber = 'Hello';
const value2: StringOrNumber = 42;

console.log("******* intersection 'OR' *******");
console.log('Union value 1: ', value1);
console.log('Union value 2: ', value2);

// INTERSECTION: name AND age
type HasNameAndAge = { name: string } & { age: number };

const person: HasNameAndAge = {
  name: 'Robert C. Martin',
  age: 72,
};

console.log("******* intersection 'AND' *******");
console.log('Intersection object: ', person);
console.log('Name: ', person.name);
console.log('Age: ', person.age);

// UNION inside an object
type HasIdWithUnion = {
  id: number | string;
};

const numericId: HasIdWithUnion = {
  id: 123,
};

const stringId: HasIdWithUnion = {
  id: 'author-123',
};

console.log('******* Union inside an object *******');
console.log('Numeric ID: ', numericId);
console.log('String ID: ', stringId);

// INTERSECTION =  ALL types must be satisfied
console.log('******* INTERSECTION *******');
console.log('His name: ', 'name' in person);
console.log('His name: ', person.name);
console.log('His age: ', 'age' in person);
console.log('His age: ', person.age);

// UNION = ONE of the possible types
console.log('******* UNION *******');
console.log('Type of value1:', typeof value1);
console.log('Type of value2:', typeof value2);
console.log('Type of numericId.id:', typeof numericId.id);
console.log('Type of stringId.id:', typeof stringId.id);

// Tuple types
type IsbnParts = [number, string, string];
const cleanCodeIsbn: IsbnParts = [978, '0132', '350884'];
const [group, publisher, titleCode] = cleanCodeIsbn;

console.log('******* TUPLE *******');
console.log('Whole ISBN:', cleanCodeIsbn);
console.log('ISBN-group:', group);
console.log('ISBN-publisher:', publisher);
console.log('ISBN-titleCode:', titleCode);

// Tuples for function return values
type BookResult = [Book | null, Error | null];

const findBook = (id: string): BookResult => {
  if (id === '1') {
    return [book, null];
  }

  return [null, new Error('Book not found')];
};

console.log('******* BOOK SEARCH *******');

const [foundBook, notFoundError] = findBook('1');

if (notFoundError) {
  console.log('Error finding book:', notFoundError.message);
} else {
  console.log('Found book:', foundBook);
}

const [missingBook, missingBookError] = findBook('999');

if (missingBookError) {
  console.log('Error finding book:', missingBookError.message);
} else {
  console.log('Found book:', missingBook);
}

// The `keyof` operator
type GenreDescriptions = {
  horror: string;
  romance: string;
  scienceFiction: string;
};

const descriptions: GenreDescriptions = {
  horror: 'Scary and thrilling stories',
  romance: 'Books about love and relationships',
  scienceFiction: 'Futuristic and space adventures',
};

const getGenreDescription = (genre: keyof GenreDescriptions): string => {
  return descriptions[genre];
};

console.log('******* KEYOF *******');
console.log(getGenreDescription('horror'));

const isGenreKey = (genre: string): genre is keyof GenreDescriptions => {
  return genre in descriptions;
};

const getGenreDescriptionSafely = (genre: string): string => {
  if (!isGenreKey(genre)) {
    console.error(`Unknown genre: "${genre}"`);
    return 'No description available';
  }

  return getGenreDescription(genre);
};

const userSubmittedGenre = 'fantasy';

console.log(getGenreDescriptionSafely(userSubmittedGenre));

/*******************************************************/
/* TypeScript Advanced - Generics */
/*******************************************************/

// Generic interfaces
export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

interface ApiBook {
  id: number;
  title: string;
  author: string;
}

interface ApiError {
  code: string;
  detail: string;
}

const bookList: ApiResponse<ApiBook[]> = {
  status: 200,
  message: 'Books fetched',
  data: [
    { id: 1, title: 'Clean Code', author: 'Robert C. Martin' },
    { id: 2, title: 'Refactoring', author: 'Martin Fowler' },
  ],
};

const error: ApiResponse<ApiError> = {
  status: 404,
  message: 'Resource not found',
  data: { code: 'NOT_FOUND', detail: 'No book with that ID' },
};

console.log('******* generic interfaces *******');
console.log('Book list: ', bookList);
console.log('Api Error: ', error);

// Built-in generic types
const books: Array<ApiBook> = [];
const alsoBooks: ApiBook[] = [];

books.push({ id: 1, title: 'Clean Code', author: 'Robert C. Martin' });
alsoBooks.push({ id: 2, title: 'Refactoring', author: 'Martin Fowler' });

console.log('******* Array<T> vs T[] *******');
console.log('Array<T> books:', books);
console.log('T[] alsoBooks:', alsoBooks);

const fetchBooks = (): Promise<ApiBook[]> => {
  return new Promise(( resolve ) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: 'Clean Code', author: 'Robert C. Martin' },
        { id: 2, title: 'Refactoring', author: 'Martin Fowler' },
      ]);
    }, 500);
  });
};

console.log('******* Promise<T> *******');
console.log('Fetching books...');
const fetchedBooks = await fetchBooks();
console.log('Fetched books (after a fake delay):', fetchedBooks);

const featured: ReadonlyArray<ApiBook> = Object.freeze([
  { id: 1, title: 'Clean Code', author: 'Robert C. Martin' },
]);

const anotherBook = { id: 2, title: 'Refactoring', author: 'Martin Fowler' };

console.log('******* ReadonlyArray<T> *******');
console.log('Featured (readonly):', featured);

// featured.push(anotherBook); // Compile error: Property 'push' does not exist on type 'readonly ApiBook[]'
console.log('Another book will not be added', anotherBook);

// Generic functions
const getFirst = ( items: unknown[] ): unknown => {
  return items[0];
};

console.log('******* Generic function call without type information *******');
const title = getFirst([ 'Clean Code', 'Refactoring' ]);
console.log('Title is: ', title);

const getFirstGeneric = <T>( items: T[] ): T | undefined => {
  return items[0];
};

console.log('*******  Generic function call with type information *******');
const titleGeneric = getFirstGeneric([ 'Clean Code', 'Refactoring' ]);
const idGeneric = getFirstGeneric([ 1, 2, 3 ]);
console.log(`titleGeneric is: ${titleGeneric}, type of titleGeneric is: ${typeof titleGeneric}`);
console.log(`idGeneric is: ${idGeneric}, type of idGeneric is: ${typeof idGeneric}`);


// Generic constraints
const getEntityId = <T extends { id: number | string }> (
  entity: T,
): number | string => {
  return entity.id;
};

console.log('*******  Generic constraints(number | string) *******');
const idString = getEntityId({ id: 'author-123', title: 'Clean Code' });
const idNumber = getEntityId({ id: 1, name: 'no id here' });
console.log(`idString is: ${idString}, type of idString is: ${typeof idString}`);
console.log(`idNumber is: ${idNumber}, type of idNumber is: ${typeof idNumber}`);

// getEntityId({ name: "no id here" }); // compile error: property 'id' is missing

// Multiple type parameters
const createEntry = <K extends string, V>(key: K, value: V): [K, V] =>{
  return [key, value];
}

console.log('*******  Multiple type parameters *******');
const entry = createEntry("isbn", "978-0132350884");
console.log('Entry: ', entry);

// Default type parameters
interface ApiResponseWithDefault<T = unknown> {
  status: number;
  message: string;
  data: T;
}

console.log('*******  Default type parameters *******');
const raw: ApiResponseWithDefault = { status: 200, message: "OK", data: null };
const typed: ApiResponseWithDefault<Book> = { status: 200, message: "OK", data: book };
console.log('Raw: ', raw);
console.log('Typed: ', typed);
