module("DOM based lm.js");
test("Top level", function () {
  var t;
  ok(q.isF(lmd), "lmd is a function");
  ok(lmd() === false, "rejects badly formed input");
  ok(q.isDOM(lmd(['p'])), "creates p tag for ['p']");
  ok(lmd(['not a real tag']) === false, "only accepts well formed tag names");
  t = lmd([['p'], ['p']]);
  ok(!q.isU(t.childNodes) && t.childNodes.length === 2,
    "creates two p tags for [['p'], ['p']]");
  ok(lmd(['p', 'some text']).firstChild.innerHTML === "some text", "text is inserted within current child");
  ok((lmd(['p', 'some text', ' and more']).firstChild.innerHTML ===
      "some text and more"),
      "text is inserted within current child even when broken");
});
test("Nested - recursive", function () {
  var n1;
  n1 = lmd(['p', 'A sentence with some', ['em', 'italic text']]);
  ok((n1.firstChild.nodeName === 'P' &&
      (n1.firstChild.lastChild.nodeName === 'EM')), "scentce with nested em");
  n1 = lmd(['ul', ['li', 'one', ['ul', [['li', 'a']]], ['li', 'two']]]);
  ok(n1.firstChild.nodeName === 'UL' &&
    n1.firstChild.firstChild.nodeName === 'LI' &&
    n1.firstChild.firstChild.childNodes[1].nodeName === 'UL', "Nesting works with nested arrays");
});
test("Attributes", function () {
  ok(lmd(['p', 'text', {'id': 'test'}]).firstChild.id === 'test', "set an id");
  ok(q.isES(lmd(['p', 'text', {'id': 123}]).firstChild.id), "use only string");
  ok(lmd(['p', 'text', {'style': 'border: 1px solid;'}]).firstChild.style.border === '1px solid', "set style attribute");
  ok(lmd(['p', 'text', {
    'style': {
      border: '1px solid'
    }
  }]).firstChild.style.border === '1px solid', "set style attribute via object");
});
