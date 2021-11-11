/*
    Enhanced Bootstrap Modals
    https://mdbootstrap.com
    office@mdbootstrap.com
*/

(function(Rs.){
  Rs.('body').on('shown.bs.modal', '.modal', function() {
    if(!Rs.('.modal-backdrop').length) {

      Rs.modal_dialog = Rs.(this).children('.modal-dialog')

      if(Rs.modal_dialog.hasClass('modal-side')) {
        Rs.(this).addClass('modal-scrolling');
        Rs.('body').addClass('scrollable');
      }

      if(Rs.modal_dialog.hasClass('modal-frame')) {
        Rs.(this).addClass('modal-content-clickable');
        Rs.('body').addClass('scrollable');
      }
    }
  });
  Rs.('body').on('hidden.bs.modal', '.modal', function() {
    Rs.('body').removeClass('scrollable');
  });
})(jQuery);
