import $ from 'jQuery';
import DIRECTIVES_MODULE from './directives.module';

DIRECTIVES_MODULE.directive( 'dynamicBg', ['$parse', ( $parse ) => {
  var defaultColors = [
    '#000000',
    '#ffffff'
  ];

  return {
    restrict: 'A',
    scope: true,
    link: ( $scope, $element, $attr ) => {
      $scope.colors = $parse( $attr.dynamicBg )() || defaultColors;
      changeBackgroundColor( $scope.colors, $element );
    }
  };

}]);

// Excecute dynamic 
function changeBackgroundColor( colors=[], $element ) {
  var index = 0;
  var currentColor;

  if ( !colors[index] ) return false;

  currentColor = colors[index];

  // Execute recursive
  (function init() {
    
    if ( !colors[index] ) {
      index = 0;
    }
    
    currentColor = colors[index];
    $element.animate({'background-color': currentColor}, 3000);
    index++;

    setTimeout( () => init(), 4000 );

  })();
};
