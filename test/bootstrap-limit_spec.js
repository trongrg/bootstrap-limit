describe('BootstrapLimit', function(){
  var fixture = '<input class="bl-test"><span id="counter"></span>';

  beforeEach(function(){
    var $fixtures, $input;

    setFixtures(fixture);
    $fixtures = $('#jasmine-fixtures');
    this.$input = $fixtures.find('.bl-test');
    this.$counter = $fixtures.find('#counter');
  });

  describe('when initialized', function() {
    beforeEach(function() {
      var flag = false;
      runs(function() {
        this.$input.limit();
      });
      this.$input.on('bootstrap-limit:initialized', this.spy = jasmine.createSpy());
      this.$input.on('bootstrap-limit:initialized', function() { flag = true; });
      waitsFor(function() {
        return flag;
      }, 'The spy should be run', 10);
    });

    it('triggers initialized event', function() {
      expect(this.spy).toHaveBeenCalled();
    });
  });

  describe('on keyup', function() {
    beforeEach(function() {
      this.$input.limit({maxLength: 10, counter: '#counter'});
      this.$input.val('test').keyup();
    });

    it('updates counter', function() {
      expect(this.$counter.text()).toEqual('6');
    });

  });

  describe('on keypress', function() {
    beforeEach(function() {
      this.$input.limit({maxLength: 10, counter: '#counter'});
      this.$input.val('test').keypress();
    });

    it('updates counter', function() {
      expect(this.$counter.text()).toEqual('6');
    });
  });

  describe('when exceed max length', function() {
    beforeEach(function() {
      this.$input.limit({maxLength: 10, counter: '#counter'});
      this.$input.on('bootstrap-limit:crossed', this.spy = jasmine.createSpy());
      this.$input.val('12345678901').keyup();
    });

    it('updates counter', function() {
      expect(this.$counter.text()).toEqual('-1');
    });

    it('changes counter color to red', function() {
      expect(this.$counter.css('color')).toEqual('rgb(255, 0, 0)');
    });

    it('triggers crossed event', function(){
      expect(this.spy).toHaveBeenCalled();
    });
  });

  describe('when uncross max length', function() {
    beforeEach(function() {
      this.$input.limit({maxLength: 10, counter: '#counter'});
      this.$input.on('bootstrap-limit:uncrossed', this.spy = jasmine.createSpy());
      this.$input.val('12345678901').keyup();
      this.$input.val('123456789').keyup();
    });

    it('updates counter', function() {
      expect(this.$counter.text()).toEqual('1');
    });

    it('changes counter color back', function() {
      expect(this.$counter.css('color')).not.toEqual('rgb(255, 0, 0)');
    });

    it('triggers uncrossed event', function(){
      expect(this.spy).toHaveBeenCalled();
    });
  });

  describe('custom color', function() {
    beforeEach(function() {
      this.$input.limit({maxLength: 10, counter: '#counter', color: 'blue'});
      this.$input.val('12345678901').keyup();
    });

    it('changes counter color to custom color', function() {
      expect(this.$counter.css('color')).toEqual('rgb(0, 0, 255)');
    });
  });
});
