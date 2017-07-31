angular.module('product.controllers', [])

.controller('ProductCtrl', function ($scope, APIService, $state, $uibModal,$rootScope, ngDialog) {
  
    var myLat;
    var myLng;
    $scope.filter = { UserAuthorInfo: { OwnerId: '' }, Title: '', distance: '', reportedCount: '', Address: '' }
    $scope.filter1 = { distance: '' };
    $scope.page = 'main';
    $rootScope.loadCompetition = true;
  //  mapservices.getLatLong().then(function (position) {
      //  console.log(suc)
    APIService.setData({
        req_url: url_prifix + 'api/getProperties',
        data: {}
    }).then(function(resp) {
        console.log("====resp======",resp);
        if(resp.data) {
            $scope.propertyDetails = resp.data;
            $scope.url = url_prifix;
        }
    },function(resp) {
        // This block execute in case of error.
    });
    $scope.showDetailsProperty = function(task) {
        $state.go('app.productDetail',{data : JSON.stringify(task)})
    }
    $scope.showUpdateProperty = function(task) {
        $state.go('app.updateProduct',{data : JSON.stringify(task)})
    }
    
      
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
}).filter('rangeFilter', function() {
    return function( items, rangeInfo ) {
        var filtered = [];
       // console.log(items)
        if (items) {
            if (rangeInfo.distance) {
                //  alert(JSON.stringify(items))
                angular.forEach(items, function (value, key) {
                    // alert(JSON.stringify(value))
                    if (rangeInfo.distance == '1') {
                       
                        if (value.distance == '< 1') {
                            alert(value.distance)
                            filtered.push(value);
                        }
                    } else {

                var itemDistance = parseInt(value.distance)
                var filterDistance = parseInt(rangeInfo.distance);
               // alert(value.distance + "==============" + filterDistance)
                if (itemDistance <= filterDistance) {
                //  alert(itemDistance);
                    filtered.push(value);
                }
                    }
                })
                return filtered;
            } else {
                return items;
            }

        } else {

        return items;
        }
    };
});;