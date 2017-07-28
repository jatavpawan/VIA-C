//Generic service for calling API
angular.module('cordovadialogservice.module', []).factory('cordovadialogservice', ['$http','$q', '$cordovaDialogs', function ($http,$q, $cordovaDialogs) {

    return {
        alert: function (message, title, buttonname) {
            console.log('called alert');
            var deferred = $q.defer();
            $cordovaDialogs.alert(message, title, buttonname)
   .then(function (res) {
       
       console.log(res)
       deferred.resolve(res);
   });
            return deferred.promise;
        },
        confirm: function (message,title,buttonArray) {
            var deferred = $q.defer();
           // console.log(buttonArray);
            $cordovaDialogs.confirm(message, title, buttonArray)
   .then(function (res) {

       //console.log(res)
       deferred.resolve(res);
   });
            return deferred.promise;
        }
    };
}]);
