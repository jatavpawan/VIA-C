angular.module('app.controllers', ['ui.bootstrap', 'APIModule', 'ngFileUpload', 'ngDialog', 'ui.tree'])

.controller('AppCtrl', function($scope, APIService, $state, $rootScope) {
  $scope.logout = function() {
      localStorage.setItem('isLoggedIn','');
      $state.go('login');
  }
  $rootScope.loadCompetition = false;
});
