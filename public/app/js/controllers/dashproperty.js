angular.module('dashproperty.controllers', [])

.controller('dashpropertyCtrl', function ($scope, $state, $rootScope, httpservices, cordovadialogservice, datastoreservice) {
    var data = JSON.parse(localStorage.getItem('userDetails'));
    httpservices.setData({ req_url: URL + "api/getProperties", data:{} }).then(function (res) {
        console.log(res.data==[]);
        if (res.data) {
            console.log('kalsdfj')
           
        } else {
            cordovadialogservice.alert('Your session is expired. Try login again', 'Alert', 'OK')
            $state.go('login')
            console.log('asdaaaaa')
        }
        $scope.propertyDetails = res.data;
       
        angular.forEach($scope.propertyDetails, function (value, index) {
            var totalInvestment = 0;
            value.image_url = URL + value.image_url;
            angular.forEach(value.investors, function (val, i) {
                totalInvestment +=parseInt( val.Investment_amount);
            })
            console.log(totalInvestment);
            value.totalInvestment = totalInvestment;
            console.log(((value.funding_amount - totalInvestment) * 100 / value.funding_amount));
            value.percentAmountInvested = (100 - ((value.funding_amount - totalInvestment) * 100 / value.funding_amount)).toFixed(0);
            console.log(value.percentAmountInvested);
        var a =moment();
        var b = moment(value.end_date);
      
        value.ending_time = b.diff(a, 'days');
       
     
        console.log(value.ending_time)

        })
    })
    $scope.viewProperty = function (index) {
        console.log()
        datastoreservice.registerUserSet(JSON.stringify($scope.propertyDetails[index]));
        $state.go('tab.propertyDetail');
    }
})