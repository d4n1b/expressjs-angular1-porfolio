import $ from 'jQuery';
import angular from 'angular';
import DIRECTIVES_MODULE from './directives.module';

// http://stackoverflow.com/questions/13325008/typewriter-effect-with-jquery
DIRECTIVES_MODULE.directive( 'typingEffect', [() => {

  return {
    restrict: 'A',
    scope: {
      words: "=?typingEffect"
    },
    link: ( $scope, $elem, $attr ) => {
      $scope.words = $scope.words || [];

      if ( $scope.words.length <= 0 ) return;

      try {
        $elem.typed({
          strings: $scope.words,
          typeSpeed: 10,
          loop: true
        });
      } catch(e) {}
    }
  };

}]);
