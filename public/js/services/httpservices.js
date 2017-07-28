//Generic service for calling API
angular.module('httpservices.module', []).factory('httpservices', ['$http', function ($http) {
   
    return {
        getData: function (obj) {
            var xhr = $http({
                url: obj.req_url,
                method: 'GET',
                data: obj.data,
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                    
                  
                }
            });
            return xhr;
        },
        setData: function (obj) {
            console.log(obj.data);
            var xhr = $http({
                url: obj.req_url,
                method: 'POST',
                data: obj.data,
              
                headers: {
                    'Content-Type' : 'application/json; charset=UTF-8'
                  
                }
            });
            return xhr;
        },
        removeData: function (obj) {
            var xhr = $http({
                url: obj.req_url,
                method: 'DELETE',
                data: obj.data,
                headers: {
                  
                }
            });
            return xhr;
        },
        updateData: function (obj) {
            var xhr = $http({
                url: obj.req_url,
                method: 'PUT',
                data: obj.data,
                headers: {
                    'Content-Type': 'application/json',
                   
                }
            });
            return xhr;
        }
    };
}]);
