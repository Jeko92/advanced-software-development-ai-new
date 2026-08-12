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
