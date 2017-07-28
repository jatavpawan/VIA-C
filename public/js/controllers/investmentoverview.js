angular.module('investmentoverview.controllers', [])

.controller('investmentoverviewCtrl', function ($scope, $state, $rootScope, httpservices, cordovadialogservice, datastoreservice) {
    var data=JSON.parse(localStorage.getItem('userDetails'));
    httpservices.setData({ req_url: URL + 'api/getInvestments', data: { user_id: data.user._id } }).then(function (suc) {
        console.log(suc)
        $scope.data = suc.data;
        angular.forEach($scope.data, function (value, key) {
            console.log(value)
            httpservices.setData({ req_url: URL + 'api/getProperties', data: { _id: value.property_id } }).then(function (res) {
                value.investors = res.data[0].investors;
                console.log(res)
            }, function (er) {


            })
        })
        
       
    }, function (er) { })
   
    $scope.investMore = function (index) {
        var data=$scope.data[index]
        httpservices.setData({ req_url: URL + "api/getProperties", data: { _id: $scope.data[index].property_id } }).then(function (res) {
            console.log(res);
            angular.forEach(res.data[0], function (key, value) {
                data[value] = key;
            })
            datastoreservice.registerUserSet(JSON.stringify(data));
            setTimeout(function () {
                $state.go('tab.propertyDetail', { reload: true })
            }, 500)
        })
       
       
        
    }
})