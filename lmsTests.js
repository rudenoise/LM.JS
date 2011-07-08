module('String based lm.js');
test('Top Level', function () {
  ok(q.isF(lms), 'lms is a function');
  ok(lms() === '', 'returns empty string by default');
  ok(lms([]) === '', 'returns empty string for empty array');
  ok(lms(['p']) === '<p></p>', 'returns correct basic tag');
});
test('parse tag', function () {
  ok(lms(['p', 'text']) === '<p>text</p>', 'returns correct basic tag with nested text');
  ok(lms(['p', 'text ', ['em', 'italic']]) === '<p>text <em>italic</em></p>', 'returns correct basic tag with nested text and nested tag');
  ok(lms(['ul', [
    ['li', '1'],
    ['li', '2']
  ]]) === '<ul><li>1</li><li>2</li></ul>', 'accepts nested array');
});
test('Attributes', function () {
  ok(lms(['p', {id: 'big'}, 'hmm?']) === '<p id="big">hmm?</p>', 'accepts basic attributes');
  ok(lms(['p', {id: 'big'}, 'hmm?', {rel: 'yo'}]) === '<p id="big" rel="yo">hmm?</p>', 'accepts attributes, broken over array');
  ok(lms(['p', {
    style: {
      color: 'red',
      border: 'solid'
    }
  }]) === '<p style="color: red; border: solid;"></p>', 'lms handles attribute objects');
});
// TODO
// handle self closing tags (br, hr, img, ..?)
// http://www.w3schools.com/tags/default.asp (HTML 4)
// make one big array and flatten (compare speed) - q.flat too slow
// look at contents of pre tag
