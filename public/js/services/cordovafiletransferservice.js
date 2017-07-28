//Generic service for calling API
angular.module('cordovafiletransferservice.module', []).factory('cordovafiletransferservice', ['$http', '$q', '$cordovaFileTransfer', function ($http, $q, $cordovaFileTransfer) {

    return {
        uploadPhoto: function (serverUrl, filePathFromMobile,token) {
            console.log('called alert');
            var deferred = $q.defer();
            document.addEventListener('deviceready', function () {
                var options = {};
                options.fileKey = "file";
                options.fileName = filePathFromMobile.substr(filePathFromMobile.lastIndexOf('/') + 1);
                options.mimeType = "image/jpeg";
                options.chunkedMode = false;
                var headers = { 'x-access-token': token };
                options.headers = headers;
                //var res = options.fileName.split("?");
                //options.fileName = res[0];
                options.fileName = options.fileName.split("?")[0];
                $cordovaFileTransfer.upload(serverUrl, filePathFromMobile, options)
                  .then(function (result) {
                      // Success!
                      deferred.resolve(result);
                  }, function (err) {
                      // Error
                      deferred.reject(err)
                  }, function (progress) {
                      // constant progress updates
                  });

            }, false);
          
            return deferred.promise;
        },
      
    };
}]);
