angular.module('productDetail.controllers', [])

.controller('ProductDetailCtrl', function ($scope, $state, $stateParams, $uibModal, ngDialog) {
    //$scope.product = $stateParams.productObj;
    //if(!$scope.product) {
    //    $state.go('app.product');
    //}
    //$scope.myInterval = 3000;
    //$scope.active_slide = 0;
    $scope.url = url_prifix;
    $scope.task = JSON.parse($stateParams.data);
    console.log($scope.task)
    var myLat;
    var myLng;
    console.log($scope.task)
  
   // if ($scope.task) {
        //NgMap.getMap().then(function (map) {
        //    console.log(map.getCenter([22.719569, 75.857726]));
        //    console.log('markers', map.markers);
        //    console.log('shapes', map.shapes);
        //});
   // }
   // }
    $scope.showUpdateProperty = function (task) {
        $state.go('app.updateProduct', { data: JSON.stringify(task) })
    }

   
    $scope.deleteProduct = function (product) {

      var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'partials/deleteConfirmation.html',
          controller: 'DeleteConfirmationCtrl',
          size: 'md',
          resolve: {
              product: function () {
                  return product;
              },
              url: function () {
                  return url_prifix + 'api/deleteProduct';
              }
          }
      });
      modalInstance.result.then(function (productList) {
          ngDialog.open({ template: 'partials/deletePopup.html', className: 'ngdialog-theme-default' });
          $state.go('app.product');
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
})

.controller('DeleteConfirmationCtrl', function ($scope, $rootScope, $uibModalInstance, APIService, product, url){
    $scope.delete = function () {
        APIService.removeData({
            req_url: url,
            data: product
        }).then(function(resp) {
            $uibModalInstance.close(resp.data);
            
           },function(resp) {
              // This block execute in case of error.
        });
    }
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});