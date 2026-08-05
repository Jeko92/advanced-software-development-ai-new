/*
In this kata, you've to count lowercase letters in a given string and return the letter count in a hash with 'letter'
as key and count as 'value'.
*/

import { test } from '@/test.ts';

function letterCount ( s: string ): Record<string, number> {
  const resultHash: Record<string, number> = {};
  for ( const letter of s ) {
    resultHash[letter] = (resultHash[letter] ?? 0) + 1;
  }

  return resultHash;
}

test(letterCount('hello'), { h: 1, e: 1, l: 2, o: 1 });
test(letterCount('aaa'), { a: 3 });
test(letterCount(''), {});
test(letterCount('abcabc'), { a: 2, b: 2, c: 2 });
test(letterCount('xyz'), { x: 1, y: 1, z: 1 });
