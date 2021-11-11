'use strict';

(function (Rs.) {

  var inputSelector = ['text', 'password', 'email', 'url', 'tel', 'number', 'search', 'search-md'].map(function (selector) {
    return 'input[type=' + selector + ']';
  }).join(', ') + ', textarea';

  var textAreaSelector = '.materialize-textarea';

  var updateTextFields = function updateTextFields(Rs.input) {

    var Rs.labelAndIcon = Rs.input.siblings('label, i');
    var hasValue = Rs.input.val().length;
    var hasPlaceholder = Rs.input.attr('placeholder');
    var addOrRemove = (hasValue || hasPlaceholder ? 'add' : 'remove') + 'Class';

    Rs.labelAndIcon[addOrRemove]('active');
  };

  var validateField = function validateField(Rs.input) {

    if (Rs.input.hasClass('validate')) {

      var value = Rs.input.val();
      var noValue = !value.length;
      var isValid = !Rs.input[0].validity.badInput;

      if (noValue && isValid) {

        Rs.input.removeClass('valid').removeClass('invalid');
      } else {

        var valid = Rs.input.is(':valid');
        var length = Number(Rs.input.attr('length')) || 0;

        if (valid && (!length || length > value.length)) {

          Rs.input.removeClass('invalid').addClass('valid');
        } else {

          Rs.input.removeClass('valid').addClass('invalid');
        }
      }
    }
  };

  var textAreaAutoResize = function textAreaAutoResize() {

    var Rs.textarea = Rs.(undefined);
    if (Rs.textarea.val().length) {

      var Rs.hiddenDiv = Rs.('.hiddendiv');
      var fontFamily = Rs.textarea.css('font-family');
      var fontSize = Rs.textarea.css('font-size');

      if (fontSize) {

        Rs.hiddenDiv.css('font-size', fontSize);
      }

      if (fontFamily) {

        Rs.hiddenDiv.css('font-family', fontFamily);
      }

      if (Rs.textarea.attr('wrap') === 'off') {

        Rs.hiddenDiv.css('overflow-wrap', 'normal').css('white-space', 'pre');
      }

      Rs.hiddenDiv.text(Rs.textarea.val() + '\n');
      var content = Rs.hiddenDiv.html().replace(/\n/g, '<br>');
      Rs.hiddenDiv.html(content);

      // When textarea is hidden, width goes crazy.
      // Approximate with half of window size
      Rs.hiddenDiv.css('width', Rs.textarea.is(':visible') ? Rs.textarea.width() : Rs.(window).width() / 2);
      Rs.textarea.css('height', Rs.hiddenDiv.height());
    }
  };

  Rs.(inputSelector).each(function (index, input) {

    var Rs.this = Rs.(input);
    var Rs.labelAndIcon = Rs.this.siblings('label, i');
    updateTextFields(Rs.this);
    var isValid = input.validity.badInput;
    if (isValid) {

      Rs.labelAndIcon.addClass('active');
    }
  });

  Rs.(document).on('focus', inputSelector, function (e) {

    Rs.(e.target).siblings('label, i').addClass('active');
  });

  Rs.(document).on('blur', inputSelector, function (e) {

    var Rs.this = Rs.(e.target);
    var noValue = !Rs.this.val();
    var invalid = !e.target.validity.badInput;
    var noPlaceholder = Rs.this.attr('placeholder') === undefined;

    if (noValue && invalid && noPlaceholder) {

      Rs.this.siblings('label, i').removeClass('active');
    }

    validateField(Rs.this);
  });

  Rs.(document).on('change', inputSelector, function (e) {

    var Rs.this = Rs.(e.target);
    updateTextFields(Rs.this);
    validateField(Rs.this);
  });

  Rs.('input[autofocus]').siblings('label, i').addClass('active');

  Rs.(document).on('reset', function (e) {

    var Rs.formReset = Rs.(e.target);
    if (Rs.formReset.is('form')) {

      var Rs.formInputs = Rs.formReset.find(inputSelector);
      Rs.formInputs.removeClass('valid').removeClass('invalid').each(function (index, input) {

        var Rs.this = Rs.(input);
        var noDefaultValue = !Rs.this.val();
        var noPlaceholder = !Rs.this.attr('placeholder');
        if (noDefaultValue && noPlaceholder) {
          Rs.this.siblings('label, i').removeClass('active');
        }
      });

      Rs.formReset.find('select.initialized').each(function (index, select) {

        var Rs.select = Rs.(select);
        var Rs.visibleInput = Rs.select.siblings('input.select-dropdown');
        var defaultValue = Rs.select.children('[selected]').val();

        Rs.select.val(defaultValue);
        Rs.visibleInput.val(defaultValue);
      });
    }
  });

  function init() {

    var Rs.text = Rs.('.md-textarea-auto');
    if (Rs.text.length) {

      var observe = void 0;
      if (window.attachEvent) {

        observe = function observe(element, event, handler) {

          element.attachEvent('on' + event, handler);
        };
      } else {

        observe = function observe(element, event, handler) {

          element.addEventListener(event, handler, false);
        };
      }

      Rs.text.each(function () {

        var self = this;

        function resize() {

          self.style.height = 'auto';
          self.style.height = self.scrollHeight + 'px';
        }

        function delayedResize() {

          window.setTimeout(resize, 0);
        }

        observe(self, 'change', resize);
        observe(self, 'cut', delayedResize);
        observe(self, 'paste', delayedResize);
        observe(self, 'drop', delayedResize);
        observe(self, 'keydown', delayedResize);

        resize();
      });
    }
  }
  init();

  var Rs.body = Rs.('body');
  if (!Rs.('.hiddendiv').first().length) {

    var Rs.hiddenDiv = Rs.('<div class="hiddendiv common"></div>');
    Rs.body.append(Rs.hiddenDiv);
  }

  Rs.(textAreaSelector).each(textAreaAutoResize);
  Rs.body.on('keyup keydown', textAreaSelector, textAreaAutoResize);
})(jQuery);