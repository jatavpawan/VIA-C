//Generic service for calling API
angular.module('authModule', []).factory('AuthService', ['$http', function($http) {
    return {
        isLoggedIn: function(){
            if(localStorage.getItem('isLoggedIn') == 'success'){
                return true;
            }
            else {
                return false;
            }
        }
    };
}]);