document.getElementsByTagName("body")['0'].appendChild(lm([
  ['h2', 'lm.js, wirte HTML in JavaScript using ', ['em' ,'L'], 'ess ', ['em', 'Markup']],
  ['p', 'Browser-based JavaScript applications can be large, functionality that was typically server-side has moved to the client and generating HTML is necessary. Whether you use a ', ['a', {href: 'http://www.delicious.com/rudenoise/javascript+framework', target: 'blank'}, 'framework'], ' and/or a ' , ['a', {href: 'http://www.delicious.com/rudenoise/template', target: 'blank'}, ' templating engine'], ' has become an issue.'],
  ['p', 'To get to the point: I saw ', ['a', {href: 'http://trapm.com/vana-templating-an-utterly-sensible-templatin'}, ':vana-templating'], ' an elegant and expressive tool for Common Lisp, I wanted a JS version and built it. ', ['a', {href: "", target: 'blank'}, 'lm.js JavaScript mark-up/templating is on GitHub for your perusal.']],
  ['h3', 'Templating'],
  ['p', ['a', {href: 'http://en.wikipedia.org/wiki/Template_engine_(web)', target: 'blank'}, 'Templates'], ' allow presentation information to be abstracted and reused, typically a string with identifiers (that can be swapped for data) are used. ', ['a', {href: 'http://www.php.net/manual/en/history.php.php', target: 'blank'}, 'PHP is a language that grew from a templating solution'], '. Originally users needed the ability to add dynamic features to their HTML mark up, dates, page counters etc... Features were added piece by piece: include small chunks of HTML for reuse, conditional statements and so on.'],
  ['p', "From this Rasmus Lerdorf's creation grew into a full blown language. PHP has grown to the point where it has large OO frameworks and even templating systems! The core beauty of PHP is its ability to mix directly with HTML, conditional logic is built in."],

  ['p', 'Other languages are at a disadvantage in this domain, when logic is needed in a template there needs to be a mechanism to recognise and handle it. The developer has a fully equipped programming language and uses a smaller implementation of its own functionality to manage templating logic. To save on code size, resource overhead and mental fatigue it is ideal to use the languages own logic. This is a serious advantage to the PHP approach.'],
  ['h3', 'Templating in JavaScript'],
  ['p', 'JavaScript has run into this problem relatively recently. But like PHP, has such a close bond with presentation it has advantages other languages do not. Instead of working with strings and decorating them with data, it has the ', ['a', {href: 'http://en.wikipedia.org/wiki/Document_Object_Model', target: 'blank'}, 'DOM.']],
  ['p', 'There are a ', ['a', {href: 'http://jsperf.com/dom-vs-innerhtml-based-templating', target: 'blank'}, 'growing number options for JS Templating'], ' using two key techniques for building the HTML: strings and innerHTML and DOM-fragments. Most seem to use strings to generate the mark-up, regardless of how the HTML is constructed. HTML, like XML, requires a lot of typing and there for the strings are long too. As JSON provides a more concise equivalent to XML, I aimed to do the same with JavaScript and HTML.'],
  ['h3', 'Implementing lm.js'],
  ['p', "The aim was to be able to produce a :vana like data structure that could represent HTML. JS Arrays are most like Lisp's lists, objects made good key-value stores for attributes and nesting is handled by nesting the arrays. Recurse the array and evaluate each portion to a DOM node. No string parse step, only a small regular expression and little need for strict convention."],
  ['pre', "lm(['ul',\n  ['li',\n    ['p', 'one']],\n  ['li',\n    ['p', 'two']]]);\n\n// Returns:\n// <ul>\n//   <li>\n//     <p>one</p>\n//   </li>\n//   <li>\n//     <p>two</p>\n//   </li>\n// </ul>"],
  ['p', {id: 'nest'}, 'Add some attributes and nest within text:'],
  ['pre', "lm(['p', 'Some text ', ['em', 'emphasised'], ' and a ', ['a', {href: '#nest'}, 'link']]);\n\n// Returns:\n// <p>Some text <em>emphasised</em> and a <a href='#nest'>link</a></p>"],
  ['p', "What about logic? As the Array is JS, simply build the array using JavaScript's logic, no need to implement a mini-language."],
  ['pre',
    "lm(['ul', (function () {\n  var rtn = [], i;\n  for (i = 0; i < 10; i += 1) {\n    rtn.push(['li', (i + ' item')]);\n  }\n  return rtn;\n}())]);",
  ,
    "\n\n//Returns:\n// <ul>\n//    <li>0 item</li>..."],
  ['p', 'lm.js differs from other templating solutions as re-use requires wrapping the mark-up in a function in order to provide logic.'],
  ['pre', "lm.render(function (obj) {\n  return lm(['p', obj.text]);\n}, {text: 'hello'});\n\n// <p>hello</p>"],
  ['h3', 'Performance'],
  ['p', 'Attempts have been made to optimise DOM generation, new node types are cached then cloned when they reoccur. Iteration rather than recursion, although this could be taken much further.'],
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
    ['li', 'JS is not as syntactically suited to list processing as Lisp, vana is more elegant'],
    ['li', 'Templates are tightly bound to JS, it would be hard to replicate the exact logic in another environment'],
    ['li', 'Only works in browser, e.g. node.js would require a rewrite using string concatenation']]]));
/*
<div class="pure">
        <h1 class='header'></h1>
        <h2 class='header2'></h2>
        <h3 class='header3'></h3>
        <h4 class='header4'></h4>
        <h5 class='header5'></h5>
        <h6 class='header6'></h6>
        <ul class='list'>
                <li class='item'></li>
        </ul>
</div>

sharedVariables = {
  header: "Header",
  header2: "Header2",
  header3: "Header3",
  header4: "Header4",
  header5: "Header5",
  header6: "Header6",
  list: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
 };


lm(['div', {class: 'pure'},
    ['h1', {class: 'header'}],
    ['h2', {class: 'header2'}],
    ['h2', {class: 'header3'}],
    ['h2', {class: 'header4'}],
    ['h2', {class: 'header5'}],
    ['ul',
      ['li', {class: 'item'}]]]);

tpl1 = function (data) {
  var rtn = [], list, i, l;
  for (k in data) {
    if (k !== 'list') {
      rtn.push([(data[k].replace('Header', 'h')), {
        class: data[k].toLowerCase()
      }]);
    } else {
      l = data[k].length;
      list = ['ul'];
      for (i = 0; i < l; i +=1) {
        list.push(['li', {class: 'item'}]);
      }
      rtn.push(list);
    }
  }
  return lm(rtn);
};
doT.template("<div><h1 class='header'>{{= it.header }}</h1><h2 class='header2'>{{= it.header2 }}</h2><h3 class='header3'>{{= it.header3 }}</h3><h4 class='header4'>{{= it.header4 }}</h4><h5 class='header5'>{{= it.header5 }}</h5><h6 class='header6'>{{= it.header6 }}</h6><ul class='list'>{{ for (var i = 0, l = it.list.length; i < l; i++) { }}<li class='item'>{{= it.list[i] }}</li>{{ } }}</ul></div>");

tpl2 = function (data) {
  return lm([
  ['h1', {class: 'header'}, data.header],
  ['h2', {class: 'header2'}, data.header2],
  ['h3', {class: 'header3'}, data.header3],
  ['h4', {class: 'header4'}, data.header4],
  ['h5', {class: 'header5'}, data.header5],
  ['h6', {class: 'header6'}, data.header6],
  ['ul', (function (ls) {
    var rtn = [], i, l = ls.length;
    for (i = 0; i < l; i += 1) {
      rtn.push(['li', {class: 'item'}, li[i]]);
    }
    return rtn;
  }(data.list))]
  ]);
};
*/
