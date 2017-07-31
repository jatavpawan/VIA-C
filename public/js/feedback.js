angular.module('feedback.controllers', [])

.controller('FeedbackCtrl', function($scope, APIService, $state, $uibModal, ngDialog) {
    $scope.feedbackList = [];
    $scope.getFeedback = function() {
        APIService.setData({
            req_url: url_prifix + 'api/getFeedback',
            data: {}
        }).then(function(resp) {
          console.log("====resp======",resp);
            if(resp.data) {
                $scope.feedbackList = resp.data;
            }
           },function(resp) {
              // This block execute in case of error.
        });
    };
    $scope.getFeedback();
    $scope.deleteFeedback = function (feedback) {
      var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'partials/deleteConfirmation.html',
          controller: 'DeleteConfirmationCtrl',
          size: 'md',
          resolve: {
              id: function () {
                  return feedback._id;
              },
              url: function () {
                  return url_prifix + 'api/deleteFeedback';
              }
          }
      });
      modalInstance.result.then(function (data) {
          ngDialog.open({ template: 'partials/deletePopup.html', className: 'ngdialog-theme-default' });
          if(data) {
              $scope.feedbackList = data;
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