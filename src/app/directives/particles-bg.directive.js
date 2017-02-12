import $ from 'jQuery';
import DIRECTIVES_MODULE from './directives.module';
import Utils from '../utils.js';

// https://codepen.io/JulianLaval/pen/KpLXOO/
DIRECTIVES_MODULE.directive( 'particlesBg', [() => {

  var elementId;
  var particleCanvas;
  var particleOptions = {
        particles: {
          number: {value: 200},
          color: {value: '#d2d2d2'},
          size: {value: 1.5},
          line_linked: {
            color: '#eaeaea',
            width: 0.5
          }
        }
      };

  return {
    restrict: 'A',
    scope: true,
    compile: ( tElement, tAttributes ) => {
        
      // Set id attr if it doesn't have one
      if ( !( elementId = tElement.attr('id') ) ) {
        elementId = `id${Utils.randStr()}`;
        tElement.attr( 'id', elementId );
      }

      return ( $scope, $elem, $attr ) => {
        try {
          particleCanvas = new particlesJS( elementId, particleOptions );
        } catch(e) {}
      }
    }
  };

}]);
