module('String based lm.js');
test('Top Level', function () {
  ok(q.isF(lms), 'lms is a function');
  ok(lms() === '', 'returns empty string by default');
  ok(lms([]) === '', 'returns empty string for empty array');
  ok(lms(['p']) === '<p></p>', 'returns correct basic tag');
  ok(lms(['p', 'text']) === '<p>text</p>', 'returns correct basic tag with nested text');
});
