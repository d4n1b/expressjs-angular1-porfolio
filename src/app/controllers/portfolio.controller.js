import CONTROLLERS_MODULE from './controller.module';
import projects from '@data/projects.json';

CONTROLLERS_MODULE.controller( 'PortfolioController', [ '$scope'
, ( $scope ) => {

  $scope.projects = projects;

}]);

export default 'PortfolioController';
