var Rs.stars;

jQuery(document).ready(function (Rs.) {

  // Custom whitelist to allow for using HTML tags in popover content
  var myDefaultWhiteList = Rs..fn.tooltip.Constructor.Default.whiteList
  myDefaultWhiteList.textarea = [];
  myDefaultWhiteList.button = [];

  Rs.stars = Rs.('.rate-popover');

  Rs.stars.on('mouseover', function () {
    var index = Rs.(this).attr('data-index');
    markStarsAsActive(index);
  });

  function markStarsAsActive(index) {
    unmarkActive();
    for (var i = 0; i <= index; i++) {
      Rs.(Rs.stars.get(i)).addClass('amber-text');
    }
  }

  function unmarkActive() {
    Rs.stars.removeClass('amber-text');
  }

  Rs.stars.on('click', function () {
    Rs.stars.popover('hide');
  });

  // Submit, you can add some extra custom code here
  // ex. to send the information to the server
  Rs.('#rateMe').on('click', '#voteSubmitButton', function () {
    Rs.stars.popover('hide');
  });

  // Cancel, just close the popover
  Rs.('#rateMe').on('click', '#closePopoverButton', function () {
    Rs.stars.popover('hide');
  });

});

Rs.(function () {
  Rs.('.rate-popover').popover({
    // Append popover to #rateMe to allow handling form inside the popover
    container: '#rateMe',
    // Custom content for popover
    content: `<div class="my-0 py-0"> <textarea type="text" style="font-size: 0.78rem" class="md-textarea form-control py-0" placeholder="Write us what can we improve" rows="3"></textarea> <button id="voteSubmitButton" type="submit" class="btn btn-sm btn-primary">Submit!</button> <button id="closePopoverButton" class="btn btn-flat btn-sm">Close</button>  </div>`
  });
  Rs.('.rate-popover').tooltip();
});
