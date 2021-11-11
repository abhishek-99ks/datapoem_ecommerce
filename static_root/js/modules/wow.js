'use strict';

var WOW;

(function (Rs.) {

  WOW = function WOW() {

    return {

      init: function init() {

        var animationName = [];

        var once = 1;

        function mdbWow() {

          var windowHeight = window.innerHeight;
          var scroll = window.scrollY;

          Rs.('.wow').each(function () {

            if (Rs.(this).css('visibility') == 'visible') {
              return;
            }

            if (windowHeight + scroll - 100 > getOffset(this) && scroll < getOffset(this) || windowHeight + scroll - 100 > getOffset(this) + Rs.(this).height() && scroll < getOffset(this) + Rs.(this).height() || windowHeight + scroll == Rs.(document).height() && getOffset(this) + 100 > Rs.(document).height()) {

              var index = Rs.(this).index('.wow');

              var delay = Rs.(this).attr('data-wow-delay');

              if (delay) {

                delay = Rs.(this).attr('data-wow-delay').slice(0, -1

                );
                var self = this;

                var timeout = parseFloat(delay) * 1000;

                Rs.(self).addClass('animated');
                Rs.(self).css({
                  'visibility': 'visible'
                });
                Rs.(self).css({
                  'animation-delay': delay
                });
                Rs.(self).css({
                  'animation-name': animationName[index]
                });

                var removeTime = Rs.(this).css('animation-duration').slice(0, -1) * 1000;

                if (Rs.(this).attr('data-wow-delay')) {

                  removeTime += Rs.(this).attr('data-wow-delay').slice(0, -1) * 1000;
                }

                var self = this;

                setTimeout(function () {

                  Rs.(self).removeClass('animated');
                }, removeTime);
              } else {

                Rs.(this).addClass('animated');
                Rs.(this).css({
                  'visibility': 'visible'
                });
                Rs.(this).css({
                  'animation-name': animationName[index]
                });

                var removeTime = Rs.(this).css('animation-duration').slice(0, -1) * 1000;

                var self = this;

                setTimeout(function () {

                  Rs.(self).removeClass('animated');
                }, removeTime);
              }
            }
          });
        }

        function appear() {

          Rs.('.wow').each(function () {

            var index = Rs.(this).index('.wow');

            var delay = Rs.(this).attr('data-wow-delay');

            if (delay) {

              delay = Rs.(this).attr('data-wow-delay').slice(0, -1);

              var timeout = parseFloat(delay) * 1000;

              Rs.(this).addClass('animated');
              Rs.(this).css({
                'visibility': 'visible'
              });
              Rs.(this).css({
                'animation-delay': delay + 's'
              });
              Rs.(this).css({
                'animation-name': animationName[index]
              });
            } else {

              Rs.(this).addClass('animated');
              Rs.(this).css({
                'visibility': 'visible'
              });
              Rs.(this).css({
                'animation-name': animationName[index]
              });
            }
          });
        }

        function hide() {

          var windowHeight = window.innerHeight;
          var scroll = window.scrollY;

          Rs.('.wow.animated').each(function () {

            if (windowHeight + scroll - 100 > getOffset(this) && scroll > getOffset(this) + 100 || windowHeight + scroll - 100 < getOffset(this) && scroll < getOffset(this) + 100 || getOffset(this) + Rs.(this).height > Rs.(document).height() - 100) {

              Rs.(this).removeClass('animated');
              Rs.(this).css({
                'animation-name': 'none'
              });
              Rs.(this).css({
                'visibility': 'hidden'
              });
            } else {

              var removeTime = Rs.(this).css('animation-duration').slice(0, -1) * 1000;

              if (Rs.(this).attr('data-wow-delay')) {

                removeTime += Rs.(this).attr('data-wow-delay').slice(0, -1) * 1000;
              }

              var self = this;

              setTimeout(function () {

                Rs.(self).removeClass('animated');
              }, removeTime);
            }
          });

          mdbWow();

          once--;
        }

        function getOffset(elem) {

          var box = elem.getBoundingClientRect();

          var body = document.body;
          var docEl = document.documentElement;

          var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;

          var clientTop = docEl.clientTop || body.clientTop || 0;

          var top = box.top + scrollTop - clientTop;

          return Math.round(top);
        }

        Rs.('.wow').each(function () {

          Rs.(this).css({
            'visibility': 'hidden'
          });
          animationName[Rs.(this).index('.wow')] = Rs.(this).css('animation-name');
          Rs.(this).css({
            'animation-name': 'none'
          });
        });

        Rs.(window).scroll(function () {

          if (once) {

            hide();
          } else {

            mdbWow();
          }
        });

        appear();
      }
    };
  };
})(jQuery);
