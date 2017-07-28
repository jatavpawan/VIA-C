//Generic service for calling API
angular.module('datastoreservice.module', []).factory('datastoreservice', ['$http', function ($http) {
    var registerUser = { first_name: "", last_name: '', email: '', password: '', country: 'Canada', check: false };
    return {
        registerUserSet: function (obj) {
            localStorage.setItem("registerUserSet", obj);
            localStorage.setItem("dataStore",JSON.stringify( obj));
            registerUser = obj;
        },
        registerUserGet: function () {
            return JSON.parse(localStorage.getItem("dataStore"));
        }
       
    };
}]);
