LM.JS - Write HTML in JavaScript using Less Markup
==================================================

Producing HTML from JavaScript is clumbersom. You're either writing out the mark-up using strings, or generating DOM nodes directly. [Templating engines][1]
reduce effort and abstract away some of the inconvenience, but have
shortcomings when mixing logic with the generations of HTML/DOM (whether or
not logic should be in a templating engine is another issue).

To get to the point: I saw [:vana-templating][2] an elegant and expressive tool for Common Lisp. I wanted a JS version and built it. [LM.JS is
on GitHub for your perusal.][3]

Using lm.js
-----------

The aim was to be able to produce a :vana like data structure that could
represent HTML accross all browsers. JS Arrays are most like Lisp's lists, objects made good key-value stores for attributes and nesting is handled by nesting the arrays. Recurse the array and evaluate each portion to a DOM node. No string parse step, only a small regular expression and little need for strict convention.

    
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

LM.JS by [Joel Hughes][7] is licensed under a Creative Commons Attribution 3.0 Unported License

   [1]: http://www.delicious.com/rudenoise/template
   [2]: http://trapm.com/vana-templating-an-utterly-sensible-templatin
   [3]: https://github.com/rudenoise/LM.JS 
   [7]: http://www.joelhughes.co.uk

