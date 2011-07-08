var before, after, body = document.body, arr = [
  ['h2', 'lm.js, wirte HTML in JavaScript using ', ['em' ,'L'], 'ess ', ['em', 'Markup']],
  ['p', 'Producing HTML from JavaScript is clumbersom, either writing out the mark-up using strings, or generating DOM nodes directly. ', ['a', {href: 'http://www.delicious.com/rudenoise/template', target: 'blank'}, 'Templating engines'], ' reduce effort and abstract away some of the inconvenience, but have shortcomings when mixing logic with the generations of HTML/DOM (whether or not logic should be in a templating engine is another issue).'],
  ['p', 'To get to the point: I saw ', ['a', {href: 'http://trapm.com/vana-templating-an-utterly-sensible-templatin'}, ':vana-templating'], ' an elegant and expressive tool for Common Lisp, I wanted a JS version and built it. ', ['a', {href: "", target: 'blank'}, 'lm.js JavaScript is on GitHub for your perusal.']],
  ['h3', 'Using lm.js'],
  ['p', "The aim was to be able to produce a :vana like data structure that could represent HTML. JS Arrays are most like Lisp's lists, objects made good key-value stores for attributes and nesting is handled by nesting the arrays. Recurse the array and evaluate each portion to a DOM node. No string parse step, only a small regular expression and little need for strict convention."],
  ['pre', "lm(['ul',\n  ['li',\n    ['p', 'one']],\n  ['li',\n    ['p', 'two']]]);\n\n// Returns this DOM tree:\n// \<ul>\n//   <li>\n//     <p>one</p>\n//   </li>\n//   <li>\n//     <p>two</p>\n//   </li>\n// </ul>"],
  ['p', {id: 'nest'}, 'Add some attributes and nest within text:'],
  ['pre', "lm(['p', 'Some text ', ['em', 'emphasised'], ' and a ', ['a', {href: '#nest'}, 'link']]);\n\n// <p>Some text <em>emphasised</em> and a <a href='#nest'>link</a></p>"],
  ['p', "What about logic? As the Array is JS, simply build the array using JavaScript's logic, no need to implement a mini-language."],
  ['pre',
    "lm(['ul', (function () {\n  var rtn = [], i;\n  for (i = 0; i < 10; i += 1) {\n    rtn.push(['li', (i + ' item')]);\n  }\n  return rtn;\n}())]);",
  ,
    "\n\n// <ul>\n//    <li>0 item</li>..."],
  ['p', 'lm.js differs from templating solutions as JavaScript logic can be used inline.'],
  ['pre', "lm.render(function (obj) {\n  return lm(['p', obj.text]);\n}, {text: 'hello'});\n\n// <p>hello</p>"],
  ['h3', 'Performance'],
  ['p', 'The aim of this version was to gain the expressive markup and feel of vana in JavaScript. While performance is an issue, it was not the sole aim to be fast at the expense of ease of use.'],
  ['p', 'This ', ['a', {href: 'http://jsperf.com/dom-vs-innerhtml-based-templating/130', target: 'blank'}, 'templating performance test on JSPerf'], ' has lm.js comming out in last place behind mustache.js, in the coming weeks I aim to place lm.js higher up the list. However, the techniques used to satisfy this particular test may not be desirable in the long run. Using more intelligent caching and priming those caches are techniques that could be employed. On the other hand, creating a cache of each element, or element group, has its own overhead in execution speed and memory. "Cold start" preformance matters too and memory is a major factor on mobile.'],
  ['p', 'One improvement may be to use string concatenation and innerHTML as opposed to the current DOM elements attached to document fragments (a technique covered in ', ['a', {href: 'http://www.youtube.com/watch?v=mHtdZgou0qU', target: 'blank'}, "Nicholas Zaka's Google tech talk"], ').'],
  ['h3', 'Pros'],
  ['ul',
    ['li', 'Some of the style from vana in JavaScript'],
    ['li', 'No string parsing, lexing or heavy validation needed'],
    ['li', 'Uses native JS Arrays as core data type'],
    ['li', 'Provides a very flexible way to deal with DOM generation'],
    ['li', 'Requires fewer characters to produce well formed HTML, smaller JS payloads too'],
    ['li', 'Can be used as a ', ['a', {href: 'http://daringfireball.net/projects/markdown/', target: 'blank'}, 'markdown'], ' like tool for quickly producing HTML']],
  ['h3', 'Cons'],
  ['ul',
    ['li', 'Slower than a templating engine, although not by a lot and dependent on the benchmarking rules'],
    ['li', 'JS is not as syntactically suited to list processing as Lisp, vana is more elegant'],
    ['li', 'Templates are tightly bound to JS, it would be hard to replicate the exact logic in another environment'],
    ['li', 'Only works in browser, e.g. node.js would require a rewrite using string concatenation']],
  ['h3', 'Next Steps'],
  ['p', 'Building up lm.js to cover more traditional templating functionality and move up the performance table at JSPerf.']];
before = new Date().getTime();
body.innerHTML = lms(arr);
after = new Date().getTime();
console.log('LM-String demo render: ', after - before, 'ms');
body.innerHTML = '';
before = new Date().getTime();
body.appendChild(lmd(arr));
after = new Date().getTime();
console.log('LM-DOM demo render: ', after - before, 'ms');

