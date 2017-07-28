
angular.module('termsandcondition.controllers', [])

.controller('termsandconditionCtrl', function ($scope, $state, $ionicPopup, cordovadialogservice, httpservices, datastoreservice, $ionicScrollDelegate) {
    $scope.canContinue = false;
    $scope.user = datastoreservice.registerUserGet();
    $scope.checkAgreement = function () {
        console.log($scope.user);
        if ($scope.canContinue) {
            var data = { req_url: URL + 'createUser', data: $scope.user }
            httpservices.setData(data).then(function (response) {
                console.log(response);
                if (angular.isUndefined(response.data.success)) {

                    $state.go('growthpoolscreen');
                }
                else {
                    cordovadialogservice.alert(response.data.message, 'Alert', 'Ok').then(function (res) {
                        return;
                    });
                }
            }, function (error) {

            })
        } else {
            cordovadialogservice.alert('Please read documents completely to continue', 'Alert', 'Ok').then(function (res) {
                return;
            });
        }
        
    }
    var elmnt = document.getElementById('scroll_height');
    $scope.checkCheckbox = function () {
        console.log($scope.checkBox);
      
        if ($scope.checkBox) {
            var pos=$ionicScrollDelegate.$getByHandle('content').getScrollPosition();
            var y = elmnt.scrollHeight;
            console.log(y);
            console.log(pos)
            if (pos.top > y-800) {
                console.log('success')
                $scope.canContinue = true;
            } else {
                cordovadialogservice.alert('Please read documents completely to continue', 'Alert', 'Ok').then(function (res) {
                    return;
                });
                $scope.checkBox = false;
            }
          
        }
    }
    
})