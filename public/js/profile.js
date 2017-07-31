angular.module('profile.controllers', [])

.controller('profileController', function ($scope, $state, APIService,Upload) {
	$scope.data={};



 $scope.updateProfile=function(data){
 	//alert(data)
 	var obj={};
 	obj.req_url=url_prifix+'updateUser';
 	obj.data=data;
APIService.setData(obj).then(function(res){
//alert(res);	
console.log(res);
$state.go('app.product')
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