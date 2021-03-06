About
----
SearchIn - jQuery autocomplete plugin that transforms your HTML select list to autocomplete field.

It's better [to see with own eyes](http://bilogub.github.com/searchin/) :)

SearchIn works as follows:

1. You need to include jQuery on your page

2. Also include `jquery.searchin.js` and `jquery.searchin.css`

3. Then add HTML code with `<select>` tag:


``` html
<select data-searchin="searchin" id="my-id">
  <option value="5">Cat</option>
  <option value="6">Goose</option>
  <option value="7">Pig</option>
  <option value="8">Dog</option>
</select>
```

4. SearchIn will automatically search for `<select>` with attribute `data-searchin="searchin"` and transform it to

`<input>` with `searchin` class and attribute `data-value` which will hold the value that corresponds to `<option>`'s

value of `<select>` control after the user selects one and `id` attribute `searchin-` + `id` of `<select>` e.g. if you

set the `<select id="my-select">` then `<input>` will have `id="seachin-my-select"` with the help of it you can

get current text value and the value itself from `data-value` attribute:

``` javascript
var text = $('input#searchin-my-select').val();
var value = $('input#searchin-my-select').data('value');
```
Also you can initialize SearchIn from your javascript code:

``` javascript
$('select.some-select').searchin();

// or with chaining
$('select.some-select').searchin().val('Your Country');
```

Tests
-----
Tests were written with [Jasmine testing framework](https://jasmine.github.io/) and reside in `spec` folder.

To run tests you need to open `spec/specrunner.html` file in your Firefox browser([Chrome isn't supported](https://github.com/velesin/jasmine-jquery#cross-domain-policy-problems-under-chrome)).

If you found a bug please [create an issue](https://github.com/bilogub/searchin/issues/new)

License
-----
MIT License

Copyright (c) 2013 Yuriy Bilogub

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
