import angular from 'angular';

import controllers from './controllers';
import directives from './directives';
import services from './services';
import homeTmpl from '@views/ng/home.html';
import portfolioTmpl from '@views/ng/portfolio.html';
import aboutTmpl from '@views/ng/about.html';
import contactTmpl from '@views/ng/contact.html';

angular.module( 'app', [
  'ngSanitize',
  controllers,
  services,
  directives

// Allow safe ports
// -----------------------------------
]).config([ '$compileProvider', ( $compileProvider ) => {

  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|mailto|whatsapp):/);


// Templates
// -----------------------------------
}]).run([ '$rootScope', '$templateCache'
, ( $rootScope, $templateCache ) => {

  $templateCache.put( 'home.html', homeTmpl );
  $templateCache.put( 'portfolio.html', portfolioTmpl );
  $templateCache.put( 'about.html', aboutTmpl );
  $templateCache.put( 'contact.html', contactTmpl );

}]);

export default 'app';
