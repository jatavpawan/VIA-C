angular.module('login.controllers', [])

.controller('LoginController', function ($scope, $state, APIService) {
  $scope.loginData = {};
  $scope.doLogin = function(loginData) {
      APIService.setData({
          req_url: url_prifix + 'authenticate',
          data: loginData
      }).then(function(resp) {
        //  $scope.message = resp.data.message;
         // if($scope.message == 'success') {
          if(resp.data.user){
          localStorage.setItem('userDetails',JSON.stringify(resp.data.user))
              localStorage.setItem('isLoggedIn', 'success');
              localStorage.setItem('token',resp.data.token);
    //          localStorage.setItem('token', resp.data.token);
            $state.go('app.profile');  
          }else{
            alert(resp.data.message)
          }
          
         // }
         },function(resp) {
            // This block execute in case of error.
      });
  };
  $scope.sendPassword = function (user) {
      APIService.setData({
          req_url: url_prifix + 'forgotPassword',
          data: {email : user.email}
      }).then(function(resp) {
          $scope.forgotMessage = resp.data.successMessage;
          alert("Your password is sent on your mail id")
$scope.forgotPass=false;
         },function(resp) {
            // This block execute in case of error.
            $scope.forgotMessage = "Unable to send password. Please try again.";
      });
  };

 

});




// httpservices.setData({ req_url: URL + 'api/getInvestments', data: { user_id: data.user._id } }).then(function (suc) {
//     console.log(suc)
//     $scope.data = suc.data;
//     angular.forEach($scope.data, function (value, key) {
//         console.log(value)
//         httpservices.setData({ req_url: URL + 'api/getProperties', data: { _id: value.property_id } }).then(function (res) {
//             value.investors = res.data[0].investors;
//             console.log(res)
//         }, function (er) {


//         })
//     })