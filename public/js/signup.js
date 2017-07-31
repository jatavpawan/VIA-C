angular.module('signUp.controllers', [])

.controller('signUpController', function ($scope, $state, APIService) {
	$scope.data={};
 $scope.registerUser=function(data){
 	//alert(data)
 	var obj={};
 	obj.req_url=url_prifix+'registerUser';
 	obj.data=data;
APIService.setData(obj).then(function(res){
//alert(res);	
console.log(res);
$state.go('app.product')
})
 }
 });