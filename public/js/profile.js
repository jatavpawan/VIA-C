angular.module('profile.controllers', [])

.controller('profileController', function ($scope, $state, APIService,Upload) {

	$scope.profile=JSON.parse(localStorage.getItem('userDetails'));
console.log($scope.profile)
$scope.url_prifix=url_prifix;


 $scope.updateProfile=function(){
 //	alert($scope.profile.passwordTemp==$scope.profile.password)
  if($scope.profile.passwordTemp!=$scope.profile.password){
    alert("Current password is incorrect");
    return null;
  }
  if($scope.profile.confirm_new_password!=$scope.profile.new_password){
alert("New password and confirm password do not match");
    return null;
  }
 	var obj={};
  if($scope.profile.new_password){
$scope.profile.password=$scope.profile.new_password;    
  }
  
 	obj.req_url=url_prifix+'api/updateUser';
 	obj.data=$scope.profile;
APIService.updateData(obj).then(function(res){
//alert(res);	
alert("your profile updated successfully");
localStorage.setItem("userDetails",JSON.stringify(res.data))
console.log(res);
$state.go('app.profile')
})
 }

  $scope.uploadPhoto = function (file) {
     //   alert(file)
        file.upload = Upload.upload({
          url: url_prifix + 'uploadPhoto',
          data: {file: file},
        });

        file.upload.then(function (response) {
            // $scope.property.image_url = response.data.path;
            console.log(response);
            $scope.profile.photo_url = response.data.path;
            console.log(response)
        }, function (response) {
          if (response.status > 0)
            $scope.errorMsg = response.status + ': ' + response.data;
        }, function (evt) {
          // Math.min is to fix IE which reports 200% sometimes
          file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
    };
 });