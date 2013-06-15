/* =============================================================
 * bootstrap-limit.js
 * =============================================================
 * https://github.com/trongrg/bootstrap-limit
 * Copyright 2013 TrongTran and other contributors; Licensed MIT
 * ============================================================ */

!function( $ ){

  'use strict';

  var BootstrapLimit = function ( element, options ) {
    this.$element = $(element);
    this.options = $.extend({}, $.fn.limit.defaults, options);
    this.maxLength = this.options.maxLength || this.maxLength;
    this.counter = $(this.options.counter) || this.counter;
    this.color = this.options.color || this.color;
    this.threshold = this.options.threshold || this.threshold;
    this.initialize();
  };

  BootstrapLimit.prototype = {

    constructor: BootstrapLimit,

    initialize: function() {
      this.initEvents();
      this.update();

      var self = this;
      $.when.apply($, this.$element.get()).
        always(function() {
        setTimeout(function() {
          self.$element.trigger('bootstrap-limit:initialized');
        }, 0);
      });
    },

    initEvents: function () {
      this.$element.
        on('keypress', $.proxy(this.keypress, this)).
        on('keyup',    $.proxy(this.keyup, this));
    },

    update: function () {
      this.query = this.$element.val();

      this.counter.text(this.maxLength - this.query.length);

      if (this.query.length > this.maxLength) {
        this.counter.css('color', this.color);
        this.$element.trigger('bootstrap-limit:crossed');
      } else if (this.query.length > this.maxLength - this.threshold) {
        this.counter.css('color', this.color);
        this.$element.trigger('bootstrap-limit:uncrossed');
      } else {
        this.counter.removeAttr('style');
        this.$element.trigger('bootstrap-limit:uncrossed');
      }
    },

    keyup: function (e) {
      this.update();
      e.stopPropagation();
      e.preventDefault();
    },

    keypress: function (e) {
      this.update();
      e.stopPropagation();
    }
  };


  /* bootstrap-limit PLUGIN DEFINITION
   * =========================== */

  $.fn.limit = function ( option ) {
    return this.each(function () {
      var $this = $(this),
      data = $this.data('bootstrap-limit'),
      options = typeof option == 'object' && option;
      if (!data) {
        $this.data('bootstrap-limit', (data = new BootstrapLimit(this, options)));
      }
      if (typeof option == 'string') {
        data[option]();
      }
    });
  };

  $.fn.limit.defaults = {
    maxLength: 140,
    color: 'red',
    threshold: 10,
    counter: ''
  };

  $.fn.limit.Constructor = BootstrapLimit;


  /* bootstrap-limit DATA-API
   * ================== */

  $(function () {
    $('body').on('focus.bootstrap-limit.data-api', '[data-provide="bootstrap-limit"]', function (e) {
      var $this = $(this);
      if ($this.data('bootstrap-limit')) {
        return;
      }
      e.preventDefault();
      $this.limit($this.data());
    });
  });

}( window.jQuery );
