module("lm = list/array templates");
test("Top level", function () {
  var t;
  ok(q.isF(lm), "lm is a function");
  ok(lm() === false, "rejects badly formed input");
  ok(q.isDOM(lm(['p'])), "creates p tag for ['p']");
  ok(lm(['not a real tag']) === false, "only accepts well formed tag names");
  t = lm([['p'], ['p']]);
  ok(!q.isU(t.childNodes) && t.childNodes.length === 2,
    "creates two p tags for [['p'], ['p']]");
  ok(lm(['p', 'some text']).firstChild.innerHTML === "some text", "text is inserted within current child");
  ok((lm(['p', 'some text', ' and more']).firstChild.innerHTML ===
      "some text and more"),
      "text is inserted within current child even when broken");
});
test("Nested - recursive", function () {
  var n1;
  n1 = lm(['p', 'A sentence with some', ['em', 'italic text']]);
  ok((n1.firstChild.nodeName === 'P' &&
      (n1.firstChild.lastChild.nodeName === 'EM')), "scentce with nested em");
  n1 = lm(['ul', ['li', 'one', ['ul', [['li', 'a']]], ['li', 'two']]]);
  ok(n1.firstChild.nodeName === 'UL' &&
    n1.firstChild.firstChild.nodeName === 'LI' &&
    n1.firstChild.firstChild.childNodes[1].nodeName === 'UL', "Nesting works with nested arrays");
});
test("Attributes", function () {
  ok(lm(['p', 'text', {'id': 'test'}]).firstChild.id === 'test', "set an id");
  ok(q.isES(lm(['p', 'text', {'id': 123}]).firstChild.id), "use only string");
  ok(lm(['p', 'text', {'style': 'border: 1px solid;'}]).firstChild.style.border === '1px solid', "set style attribute");
  ok(lm(['p', 'text', {
    'style': {
      border: '1px solid'
    }
  }]).firstChild.style.border === '1px solid', "set style attribute via object");
});
test("Render", function () {
  ok(q.isF(lm.render), "render exists");
  ok((lm.render() && lm.render(12, "")) === false, "rejects no/bad args");
  ok(q.isDOM(lm.render(function (obj) {
    return lm(['p', obj.text]);
  }, {text: 'hello'})), "returns dom for correct tpl and data");
  ok(lm.render(function (obj) {
    return lm(['p', obj.text]);
  }, {text: 'hello'}).firstChild.innerHTML === "hello", "returns dom for correct tpl and data with correct values");
});
