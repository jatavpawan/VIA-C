angular.module('requestServices.controllers', [])

.controller('ServicesCtrl', function($scope, APIService, $state, $uibModal, ngDialog) {
    $scope.pending_services = [];
    $scope.completed_services = [];
    $scope.rejected_services = [];
    $scope.serviceList = [];
    $scope.changeStatus = function(status) {
        if(status == 'PENDING')
            $scope.serviceList = $scope.pending_services;
        if(status == 'COMPLETED')
            $scope.serviceList = $scope.completed_services;
        if(status == 'REJECTED')
            $scope.serviceList = $scope.rejected_services;
    };
    $scope.setStatus = function(status, serviceListObj) {
        var current_status = serviceListObj.status;
        APIService.updateData({
            req_url: url_prifix + 'api/setServiceStatus',
            data: {status: status, serviceListObj: serviceListObj}
        }).then(function(resp) {
            console.log("====resp======",resp);
            if(resp.data) {
                $scope.pending_services = resp.data.pending_services;
                $scope.completed_services = resp.data.completed_services;
                $scope.rejected_services = resp.data.rejected_services;
                if(current_status == 'PENDING')
                    $scope.serviceList = $scope.pending_services;
                if(current_status == 'COMPLETED')
                    $scope.serviceList = $scope.completed_services;
                if(current_status == 'REJECTED')
                    $scope.serviceList = $scope.rejected_services;
            }
            ngDialog.open({ template: 'partials/dialog.html', className: 'ngdialog-theme-default' });
           },function(resp) {
              // This block execute in case of error.
        });
    };
    $scope.getServices = function() {
        APIService.setData({
            req_url: url_prifix + 'api/getService',
            data: {}
        }).then(function(resp) {
          console.log("====resp======",resp);
            if(resp.data) {
                $scope.pending_services = resp.data.pending_services;
                $scope.completed_services = resp.data.completed_services;
                $scope.rejected_services = resp.data.rejected_services;
                $scope.serviceList = $scope.pending_services;
            }
           },function(resp) {
              // This block execute in case of error.
        });
    };
    $scope.getServices();
    $scope.deleteService = function (service) {
      var current_status = service.status;
      var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'partials/deleteConfirmation.html',
          controller: 'DeleteConfirmationCtrl',
          size: 'md',
          resolve: {
              id: function () {
                  return service._id;
              },
              url: function () {
                  return url_prifix + 'api/deleteService';
              }
          }
      });
      modalInstance.result.then(function (data) {
          ngDialog.open({ template: 'partials/deletePopup.html', className: 'ngdialog-theme-default' });
          if(data) {
              $scope.pending_services = data.pending_services;
              $scope.completed_services = data.completed_services;
              $scope.rejected_services = data.rejected_services;
              if(current_status == 'PENDING')
                  $scope.serviceList = $scope.pending_services;
              if(current_status == 'COMPLETED')
                  $scope.serviceList = $scope.completed_services;
              if(current_status == 'REJECTED')
                  $scope.serviceList = $scope.rejected_services;
          }
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
})

.controller('DeleteConfirmationCtrl', function ($scope, $rootScope, $uibModalInstance, APIService, id, url){
    $scope.delete = function () {
        APIService.removeData({
            req_url: url,
            data: {id: id}
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