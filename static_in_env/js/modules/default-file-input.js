'use strict';

(function (Rs.) {
  Rs.('.input-default-wrapper').on('change', '.input-default-js', function (e) {

    var Rs.this = Rs.(e.target),
        Rs.label = Rs.this.next('label'),
        Rs.files = Rs.this[0].files;
    var fileName = '';

    if (Rs.files && Rs.files.length > 1) {
      fileName = (Rs.this.attr('data-multiple-target') || '').replace('{target}', Rs.files.length);
    } else if (e.target.value) {
      fileName = e.target.value.split('\\').pop();
    }
    fileName ? Rs.label.find('.span-choose-file').html(fileName) : Rs.label.html(Rs.label.html());
  });
})(jQuery);