angular.module('signUp.controllers', [])

.controller('signUpController', function ($scope, $state, APIService) {
	$scope.data={};
 $scope.registerUser=function(data){
 	//alert(data)
 	var obj={};
if(data.password!=data.confirmPassword){
	alert("password and confirm password do not match")
	return null;
}
 	obj.req_url=url_prifix+'createuser';
 	obj.data=data;
APIService.setData(obj).then(function(resp){
//alert(res);	
console.log(resp)
 if(resp.data.user){
          localStorage.setItem('userDetails',JSON.stringify(resp.data.user))
              localStorage.setItem('isLoggedIn', 'success');
             localStorage.setItem('token', resp.data.token);
            $state.go('app.profile');  
          }else{
            alert(resp.data.message)
          }
})
 }
 });