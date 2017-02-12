import $ from 'jQuery';
import main from './app.module';
import './js/menu-burguer';
import './js/scroll-to-element';

$( () => {
  angular.bootstrap( document, [main] );
});
