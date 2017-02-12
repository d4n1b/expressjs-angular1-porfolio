import $ from 'jQuery';
import DIRECTIVES_MODULE from './directives.module';

DIRECTIVES_MODULE.directive('parallax', [() => {
  var _key = 0;

  return {
    restrict: 'C',
    link: ( $scope, $element, $attr ) => {
      var fromPos = 500;
      var toPos = 450;
      var isLeft = (_key % 2 == 0 ? true : false);
      var direction = (isLeft ? 'margin-left' : 'margin-right');
      _key++;
        
      // Init parallax
      $element.css('margin-left', -fromPos);
      $element.attr('data-parallax', `{"x": ${toPos}, "smoothness": 10}`);
    }
  };

}]);
