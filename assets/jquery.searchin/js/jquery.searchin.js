
/*
 jquery.searchin.js v1.0.0
 https://github.com/belogub/searchin

 MIT License
 Copyright (c) 2012 Yuri Belogub
 Permission is hereby granted, free of charge, to any person obtaining a copy of
 this software and associated documentation files (the "Software"), to deal in the
 Software without restriction, including without limitation the rights to use, copy,
 modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
 and to permit persons to whom the Software is furnished to do so,
 subject to the following conditions:
 The above copyright notice and this permission notice shall be included in all copies
 or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
 OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var SearchIn = function(element, options) {
  this.element = element;
  this.options = options;
  this.input = null;
  this.list = null;
  this.items = [];

  this.build();
  this.bind();
};
SearchIn.prototype = {

  constructor: SearchIn,

  refine: function() {
    var self = this;
    var re = new RegExp(this.input.val().replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), 'i');
    var refined = $.grep(this.items, function(item) {
      var $item = $(item);
      var matched = !!$item.text().match(re);
      matched ? $item.show() : ($item.hide() && self.deactivate($item));
      return matched;
    });
    refined.length ? self.list.show() : self.list.hide();
  },

  active: function() {
    return this.list.find('li.active:visible')[0];
  },

  first: function() {
    return this.list.find('li:visible:first')[0];
  },

  last: function() {
    return this.list.find('li:visible:last')[0];
  },

  prev: function($active) {
    var $prev = $($active.prev()[0]);
    if (!$prev || !$prev.is(':visible')) return;
    return $prev;
  },

  next: function($active) {
    var $next = $($active.next()[0]);
    if (!$next || !$next.is(':visible')) return;
    return $next;
  },

  activate: function(item) {
    $(item).addClass('active');
  },

  deactivate: function(item) {
    $(item).removeClass('active');
  },

  toPrevious: function() {
    var active = this.active();
    if (!active) {
      this.activate(this.last());
    } else {
      var $active = $(active), previous = null;
      if (previous = this.prev($active)) {
        this.deactivate($active);
        this.activate($(previous));
      }
    }
  },

  toNext: function() {
    var active = this.active();
    if (!active) {
      this.activate(this.first());
    } else {
      var $active = $(active), next = null;
      if (next = this.next($active)) {
        this.deactivate($active);
        this.activate($(next));
      }
    }
  },

  select: function(item) {
    var active = item || this.active();
    if (!active) return false;
    var $active = $(active);
    this.input
      .val($active.text())
      .attr('data-value', $active.attr('data-value'));
    this.list.hide();
  },

  build: function() {
    var $input = $('<input type="text" data-value="">')
      .data('searchin', this)
      .addClass('searchin');
    if (this.element.attr('id')) {
      $input.attr('id', 'searchin-' + this.element.attr('id'));
    }
    var $list = $('<ul>').addClass('searchin-list');
    this.element.find('option').each(function() {
      var $item = $('<li data-value="'+ $(this).val() + '">')
        .text($(this).text());
      $list.append($item);
    });
    this.element.before(($input).after($list)).hide();

    this.input = $input,
    this.list = $list,
    this.items = $list.find('li');

    var offset = $input.offset();
    offset.top += $input[0].offsetHeight;
    this.list.offset(offset);
  },

  bind: function() {
    var self = this;
    this.input.bind({
      keyup: function(event) {
        var ignoredKeys = [13, 16, 17, 18, 27, 38, 40];
        if ($.inArray(event.keyCode, ignoredKeys) >= 0) return false;
        self.refine();
      },
      keydown: function(event) {
        switch(event.which) {
          case 13: //enter
            self.select();
            break;
          case 27: // esc
            self.list.hide();
            break;
          case 38: // up
            self.toPrevious();
            break;
          case 40: //down
            self.toNext();
            break;
          default: break;
        }
      }
    });

    this.items.each(function() {
      $(this).bind('click', function(event) {
        self.select(this);
        self.input.focus();
      });
    });
  }
};

(function($) {
  $.fn.searchin = function(options) {
    return (new SearchIn(this, options)).input;
  }
})(jQuery);

(function() {
  $(document).ready(function() {
    $('select[data-searchin]').each(function() {
      $(this).searchin();
    });
  });
})();
