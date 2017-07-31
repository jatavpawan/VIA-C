angular.module('updateProduct.controllers', [])

.controller('UpdateProductCtrl', function($scope, APIService, $state, $stateParams, Upload) {
  if($stateParams.data){
      $scope.property = JSON.parse($stateParams.data);
      $scope.property.end_date = new Date($scope.property.end_date).toLocaleDateString();
      $scope.property.image_url = $scope.property.image_url;
      $scope.url_prifix = url_prifix;
      $scope.property.funding_amount = parseInt($scope.property.funding_amount);
      $scope.property.min_invest_amount = parseInt($scope.property.min_invest_amount);
    //  alert($scope.property.image_url);
    }
  $scope.dat = {};
  $scope.dat.hasData = ($stateParams.data) ? true : false;
 
  //alert($scope.hasData)
  $scope.addProduct = function (data) {
      APIService.setData({ req_url: url_prifix + 'api/createProperty', data: $scope.property }).then(function (res) {
          console.log(res);
          $state.go('app.product')
      })
  }
    console.log($scope.property)
    $scope.deleteImages = [];
   
    //$scope.removeChoice = function(path){
    //    $scope.deleteImages.push(path);
    //    $scope.product.image_url = null;
    //};
    $scope.removeChoices = function(index){
        $scope.deleteImages.push($scope.product.product_images[index]);
        $scope.property.product_images.splice(index, 1);
    };
    $scope.uploadPhoto = function (file) {
     //   alert(file)
        file.upload = Upload.upload({
          url: url_prifix + 'api/uploadPhoto',
          data: {file: file},
        });

        file.upload.then(function (response) {
            // $scope.property.image_url = response.data.path;
            $scope.property.image_url = response.data.path;
            console.log(response)
        }, function (response) {
          if (response.status > 0)
            $scope.errorMsg = response.status + ': ' + response.data;
        }, function (evt) {
          // Math.min is to fix IE which reports 200% sometimes
          file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
    };
    $scope.updateproperty = function () {
        APIService.updateData({ req_url: url_prifix + 'api/updateProperty', data: $scope.property }).then(function (res) {
           console.log(res)
        })
    }
    $scope.uploadPhotos = function(file) {
        file.upload = Upload.upload({
          url: url_prifix + 'api/uploadPhotos',
          arrayKey: '',
          data: {file: file},
        });

        file.upload.then(function (response) {
            if(response.data.length > 0) {
                angular.forEach(response.data, function(item){
                    $scope.product.product_images.push(item.path);
                });
            }
        }, function (response) {
          if (response.status > 0)
            $scope.errorMsg = response.status + ': ' + response.data;
        }, function (evt) {
          // Math.min is to fix IE which reports 200% sometimes
          file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
    };
    $scope.updateProduct = function(data) {
        APIService.updateData({
              req_url: url_prifix + 'api/updateProduct',
              data: {productData: data, delete_images : $scope.deleteImages}
          }).then(function(resp) {
              if(resp.data.message) {
                  $state.go('app.product');
              }
              else {

              }
             },function(resp) {
                // This block execute in case of error.
        });
    };
});