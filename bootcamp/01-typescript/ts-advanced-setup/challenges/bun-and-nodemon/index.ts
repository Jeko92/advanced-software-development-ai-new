import { readFile } from 'node:fs/promises';

const content = await readFile('./message.txt');
console.log(content.toString());
