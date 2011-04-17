lm.js, wirte HTML in JavaScript using _L_ess _M_arkup
=====================================================

Producing HTML from JavaScript is clumbersom, either writing out the mark-up
using strings, or generating DOM nodes directly. [Templating engines][1]
reduce effort and abstract away some of the inconvenience, but have
shortcomings when mixing logic with the generations of HTML/DOM (whether or
not logic should be in a templating engine is another issue).

To get to the point: I saw [:vana-templating][2] an elegant and expressive
tool for Common Lisp, I wanted a JS version and built it. [lm.js JavaScript is
on GitHub for your perusal.][3]

Using lm.js
-----------

The aim was to be able to produce a :vana like data structure that could
represent HTML accross all browsers. JS Arrays are most like Lisp's lists, objects made good key-
value stores for attributes and nesting is handled by nesting the arrays.
Recurse the array and evaluate each portion to a DOM node. No string parse
step, only a small regular expression and little need for strict convention.

    
    lm(['ul',
      ['li',
        ['p', 'one']],
      ['li',
        ['p', 'two']]]);
    
    // Returns this DOM tree:
    // <ul>
    //   <li>
    //     <p>one</p>
    //   </li>
    //   <li>
    //     <p>two</p>
    //   </li>
    // </ul>

Add some attributes and nest within text:

    
    lm(['p', 'Some text ', ['em', 'emphasised'], ' and a ', ['a', {href: '#nest'}, 'link']]);
    
    // <p>Some text <em>emphasised</em> and a <a href='#nest'>link</a></p>

What about logic? As the Array is JS, simply build the array using
JavaScript's logic, no need to implement a mini-language.

    
    lm(['ul', (function () {
      var rtn = [], i;
      for (i = 0; i < 10; i += 1) {
        rtn.push(['li', (i + ' item')]);
      }
      return rtn;
    }())]);
    
    // <ul>
    //    <li>0 item</li>...

lm.js differs from templating solutions as JavaScript logic can be used
inline.

    
    lm.render(function (obj) {
      return lm(['p', obj.text]);
    }, {text: 'hello'});
    
    // <p>hello</p>

Performance
-----------

The aim of this version was to gain the expressive markup and feel of vana in
JavaScript. While performance is an issue, it was not the sole aim to be fast
at the expense of ease of use.

This [templating performance test on JSPerf][4] has lm.js comming out in last
place behind mustache.js, in the coming weeks I aim to place lm.js higher up
the list. However, the techniques used to satisfy this particular test may not
be desirable in the long run. Using more intelligent caching and priming those
caches are techniques that could be employed. On the other hand, creating a
cache of each element, or element group, has its own overhead in execution
speed and memory. "Cold start" preformance matters too and memory is a major
factor on mobile.

One improvement may be to use string concatenation and innerHTML as opposed to
the current DOM elements attached to document fragments (a technique covered
in [Nicholas Zaka's Google tech talk][5]).

Pros
----

  * Some of the style from vana in JavaScript
  * No string parsing, lexing or heavy validation needed
  * Uses native JS Arrays as core data type
  * Provides a very flexible way to deal with DOM generation
  * Requires fewer characters to produce well formed HTML, smaller JS payloads too
  * Can be used as a [markdown][6] like tool for quickly producing HTML

Cons
----

  * Slower than a templating engine, although not by a lot and dependent on the benchmarking rules
  * JS is not as syntactically suited to list processing as Lisp, vana is more elegant
  * Templates are tightly bound to JS, it would be hard to replicate the exact logic in another environment
  * Only works in browser, e.g. node.js would require a rewrite using string concatenation

Next Steps
----------

Building up lm.js to cover more traditional templating functionality and move
up the performance table at JSPerf.

LM.JS List/Array based JavaScript markup by Joel Hughes - http://github.com/rudenoise/LM.JS - http://joelughes.co.uk
LM.JS by Joel Hughes is licensed under a Creative Commons Attribution 3.0 Unported License

   [1]: http://www.delicious.com/rudenoise/template
   [2]: http://trapm.com/vana-templating-an-utterly-sensible-templatin
   [3]: https://github.com/rudenoise/LM.JS 
   [4]: http://jsperf.com/dom-vs-innerhtml-based-templating/130
   [5]: http://www.youtube.com/watch?v=mHtdZgou0qU
   [6]: http://daringfireball.net/projects/markdown/

