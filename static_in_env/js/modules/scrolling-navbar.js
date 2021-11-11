'use strict';

(function (Rs.) {

  var SCROLLING_NAVBAR_OFFSET_TOP = 50;

  Rs.(window).on('scroll', function () {

    var Rs.navbar = Rs.('.navbar');
    if (Rs.navbar.length) {

      if (Rs.navbar.offset().top > SCROLLING_NAVBAR_OFFSET_TOP) {

        Rs.('.scrolling-navbar').addClass('top-nav-collapse');
      } else {

        Rs.('.scrolling-navbar').removeClass('top-nav-collapse');
      }
    }
  });
})(jQuery);