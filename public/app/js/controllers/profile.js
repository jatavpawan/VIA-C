angular.module('profile.controllers', [])

.controller('profileCtrl', function ($scope, $state, $rootScope, httpservices, cordovadialogservice) {
    var dat = JSON.parse(localStorage.getItem('userDetails'));
    $scope.data = dat.user;
    $scope.f_name = true;
    $scope.l_name = true;
    $scope.e_name = true;
    $scope.c_name = true;
    $scope.changeModal = function (value) {

      
        $scope[value] = !$scope[value];
        document.getElementById(value).focus;
    }
    $scope.saveData = function (value,obj) {
        console.log("=====obj======",obj)
        console.log("=====$scope.data======",$scope.data)
        httpservices.updateData({ req_url: URL + 'api/updateUser', data: $scope.data }).then(function () {
            dat.user[obj] = $scope.data[obj];
            localStorage.setItem('userDetails', JSON.stringify(dat));
        })
        $scope[value] = !$scope[value];
    }
})