//Generic service for calling API
angular.module('interceptor.module', []).factory('interceptorservice', function ($injector) {

   

    return {
        request: function (config) {
            //console.log('request')
            //console.log(config);
            $injector.get("$ionicLoading").show();
            var data;
            if (localStorage.getItem('userDetails')) {
             data = JSON.parse(localStorage.getItem('userDetails'));

            }
            // console.log(data.token);
           // if (data) {

             //   config.headers['x-access-token'] = data.token;
            //}
            //  console.log(config.headers['x-access-token']);

          if (config.data&&data) {

              config.headers['x-access-token'] = data.token;
            }
          //  config.headers['Access-Control-Allow-Headers'] = '*';
            return config;
        },

        requestError: function (config) {
            //console.log('requestError')
           // console.log(config);
            $injector.get("$ionicLoading").hide();
            return config;
        },

        response: function (res) {
            //console.log('response')
          //  $injector.get("$state").go('login')
          // console.log(res.data)
            //if (!res.data) {
                
            //    $state.go('login');
            //} else {
            //  //  console.log(res);
            //}
            $injector.get("$ionicLoading").hide();
            return res;
        },

        responseError: function (res) {
            //console.log('responseError')
            //console.log(res);
            $injector.get("$ionicLoading").hide();
            return res;
        },
      
    }
})