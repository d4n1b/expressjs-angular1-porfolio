import CONTROLLERS_MODULE from './controller.module';

CONTROLLERS_MODULE.controller( 'ContactController', ['$scope', 'ContactFormService'
, ( $scope, ContactFormService ) => {

  $scope.hasResponse = false;
  $scope.contactData = {
    name: '',
    email: '',
    website: '',
    referred: '',
    budget: '',
    timeline: '',
    message: ''
  };

  //
  $scope.sendMessage = ( data ) => {
    ContactFormService.send( data )
      .then( ( response ) => {
        $scope.hasResponse = true;
        $scope.response = response;

      }, ( response ) => {
        $scope.hasResponse = true;
        $scope.response = {
          status: 0,
          data: 'Ups!. The form could not be submited. Please, try again in a few minuts...'
        };
      });
  };

}]);
