import CONTROLLERS_MODULE from './services.module';

CONTROLLERS_MODULE.service( 'ContactFormService', ['$q', '$http'
, ( $q, $http ) => {

  return {
    send: ( data ) => {
      if ( !angular.isObject( data ) ) {
        return $q.reject({});
      }

      return $http({
        method: 'POST',
        url: '/contact',
        data: data,
      }).then( function( response ) {
        return response && response.data;

      });
    }
  };

}]);
