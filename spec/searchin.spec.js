describe("jQuery.SearchIn", function() {

  beforeEach(function() {
    loadFixtures('dropdown-fixture.html');
    $('[data-searchin="searchin"]').searchin();
  });

  describe("Create searchin from dropdown", function() {

    it("should create searchin from dropdown", function() {
      loadFixtures('dropdown-fixture.html');

      var $input = $('[data-searchin="searchin"]').searchin();
      expect($('[data-searchin="searchin"]')).toBeHidden();
      expect($input).toBeVisible();
      expect($('ul.searchin-list')).toExist();
    });

  });

  it("should show 'Cat' when 'c' is put", function() {
    $input = $('input.searchin');
    expect($input).toBeVisible();
    $input.val('c').data('searchin').refine();
    expect($('ul.searchin-list li:visible').text()).toEqual('Cat');
  });

  it("should not show the list when no matches", function() {
    $input = $('input.searchin');
    $input.val("Cow").data('searchin').refine();
    expect($('ul.searchin-list')).toBeHidden();
  });

  it("should normally react on regexp symbols when matching the input", function() {
    $input = $('input.searchin');
    expect(function() {$input.val("*").data('searchin').refine(); }).not.toThrow();
  });

  describe("Mouse events", function() {

    beforeEach(function() {
      loadFixtures('dropdown-fixture.html');

      $('[data-searchin="searchin"]').searchin()
        .val('g').data('searchin').refine(); // Goose, Pig, Dog are shown;
    });

    it("should populate input value and text with selected item's data", function() {
      $input = $('input.searchin');

      $($('ul.searchin-list li:visible')[2]).trigger("click");

      expect($input.val()).toEqual('Dog');
      expect($input.data('value')).toEqual(3);
    });
  });

  describe("Keyboard navigation and events", function() {

    beforeEach(function() {
      loadFixtures('dropdown-fixture.html');
      $('[data-searchin="searchin"]').searchin()
        .val('g').data('searchin').refine(); // Goose, Pig, Dog are shown;
    });

    var simulate = function(event, code) {
      var input = jQuery.Event(event);
      input.which = code;
      $input.trigger(input);
    };

    it("should populate input value and text with selected item's data", function() {
      $input = $('input.searchin');

      simulate('keydown', 40); // down
      expect($('ul.searchin-list li.active').text()).toEqual('Goose');

      simulate('keydown', 13); // enter
      expect($input.val()).toEqual('Goose');
      expect($input.data('value')).toEqual(1);
    });

    it("should hide the list on esc key", function() {
      $input = $('input.searchin');

      expect($('ul.searchin-list')).toBeVisible();

      simulate('keydown', 27); // esc
      expect($('ul.searchin-list')).toBeHidden();
    });

    it("should navigate with up and down arrow keys", function() {
      $input = $('input.searchin');

      simulate('keydown', 38); // up
      expect($('ul.searchin-list li.active').text()).toEqual('Dog');

      simulate('keydown', 40); // down
      expect($('ul.searchin-list li.active').text()).toEqual('Dog');

      simulate('keydown', 38); // up
      expect($('ul.searchin-list li.active').text()).toEqual('Pig');
    });
  });
});