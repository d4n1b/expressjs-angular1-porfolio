import Utils from '../utils';

$( () => {

  var $window = $( window );
  var $body = $( 'body' );
  var scrollMaps = [];
  var elementClicked = false; // avoid trigger selectTabOnScroll function
  var scrollTrigger = '[data-scroll-to]';
  var $scrollTrigger;
  var $scrollItems;

  $window.scroll( selectTabOnScroll );
  $( 'body' ).on( 'click', '[data-scroll-to]', scrollToElement );


  // -- Scroll to target when tab is clicked
  // 
  function scrollToElement( event ) {
    event.preventDefault();
    elementClicked = true;
    $scrollTrigger = $scrollTrigger || $( scrollTrigger );

    var $element = $(event.target);
    var $scrollElement = $( $element.attr('data-scroll-to') );

    if ( !$scrollElement.length ) return;

    $scrollTrigger.removeClass('active');
    $element.addClass('active');

    $body.animate({
      scrollTop: $scrollElement.offset().top
    }, 500, () => elementClicked = false );
  }

  // -- Scroll to target when tab is clicked
  // 
  function selectTabOnScroll( event ) {
    if ( elementClicked ) return;

    var $scrollContainer = $( event.target );
    var visibleElements = [];
    var $scrollItems = $scrollItems || $scrollContainer.find('.scroll-item');
    var activeTrigger, $element;

    $scrollTrigger = $scrollTrigger || $( scrollTrigger );
    
    $scrollItems.each( ( key, element ) => {
      $element = $(element);
      let elemPosTop = -( $scrollContainer.scrollTop() - $element.offset().top );

      // Detect tabs in visible range
      if ( ( elemPosTop + $element.height() > 0 )
        && ( elemPosTop < $window.height() ) ) {
          visibleElements.push( $element.attr('id') );
      }
    });

    // Select the tab
    if ( activeTrigger = visibleElements.splice( 0, 1 ) ) {
      $scrollTrigger.removeClass('active');
      $(`[data-scroll-to=#${activeTrigger}]`).addClass('active');
      $scrollTrigger.trigger( 'ScrollToElement:active', `#${activeTrigger}` );
    }
  };

});
