//Generic service for calling API
angular.module('modalService.module', []).factory('modalService', ['$ionicModal', function ($ionicModal) {
   
    return {
        createModal: function (scope,templateurl) {
            var modalRes;
            alert(templateurl)
            $ionicModal.fromTemplateUrl(templateurl, {
                scope: scope
            }).then(function (modal) {
                scope.modalRes = modal;
                return scope;
            });
        }
       
    };
}]);
