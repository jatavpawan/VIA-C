//Generic service for calling API
angular.module('cordovacameraservice.module', []).factory('cordovacameraservice', ['$http', '$q', '$cordovaCamera', function ($http, $q, $cordovaCamera) {

    return {
       
        getImagePathFromMobile: function () {
            var deferred = $q.defer();
            document.addEventListener('deviceready', function () {
            console.log('called alert');
           
            var defaultOption = {
                destinationType: navigator.camera.DestinationType.FILE_URI,
                sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
                mediaType: Camera.MediaType.ALLMEDIA
            }
            $cordovaCamera.getPicture(defaultOption).then(function (imageData) {

      
       deferred.resolve(imageData);
            }, function (er) {
                deferred.reject(er);
            });
        }, false);
            return deferred.promise;
        },
        
    };
}]);
