/*!
 * bootstrap-limit.js 0.0.1
 * https://github.com/trongrg/bootstrap-limit
 * Copyright 2013 TrongTran and other contributors; Licensed MIT
 */

var VERSION = "0.0.1";

!function($) {
    "use strict";
    var BootstrapLimit = function(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, $.fn.limit.defaults, options);
        this.maxLength = this.options.maxLength || this.maxLength;
        this.counter = $(this.options.counter) || this.counter;
        this.initialize();
        this.listen();
        this.check();
    };
    BootstrapLimit.prototype = {
        constructor: BootstrapLimit,
        initialize: function() {
            var $element = this.$element;
            $.when.apply($, this.$element).always(function() {
                setTimeout(function() {
                    $element.trigger("bootstrap-limit:initialized");
                }, 0);
            });
        },
        listen: function() {
            this.$element.on("keypress", $.proxy(this.keypress, this)).on("keyup", $.proxy(this.keyup, this));
        },
        check: function() {
            this.query = this.$element.val();
            this.counter.text(this.maxLength - this.query.length);
            if (this.query.length > this.maxLength) {
                this.counter.css("color", "red");
                this.$element.trigger("bootstrap-limit:crossed");
            } else {
                this.counter.css("color", "");
                this.$element.trigger("bootstrap-limit:uncrossed");
            }
        },
        keyup: function(e) {
            this.check();
            e.stopPropagation();
            e.preventDefault();
        },
        keypress: function(e) {
            this.check();
            e.stopPropagation();
        }
    };
    $.fn.limit = function(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("limit"), options = typeof option == "object" && option;
            if (!data) $this.data("limit", data = new BootstrapLimit(this, options));
            if (typeof option == "string") data[option]();
        });
    };
    $.fn.limit.defaults = {
        maxLength: 140,
        counter: ""
    };
    $.fn.limit.Constructor = BootstrapLimit;
    $(function() {
        $("body").on("focus.limit.data-api", '[data-provide="limit"]', function(e) {
            var $this = $(this);
            if ($this.data("limit")) return;
            e.preventDefault();
            $this.limit($this.data());
        });
    });
}(window.jQuery);