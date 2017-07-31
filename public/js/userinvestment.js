angular.module('userinvestment.controllers', [])

.controller('UserinvestmentCtrl', function($scope, APIService, $state, ngDialog ,$rootScope) {
  $scope.page = 'main';
 $scope.show = true;
// $scope.show = false;
//   $scope.data = {
//     name : 'In Directive'
//   };
 $scope.dat = {}
 $scope.dat.heightScreen = { 'height': screen.height-200 + 'px' };
// alert(JSON.stringify($scope.dat.heightScreen));


 $scope.toggle = function() {
    $scope.show = !$scope.show;
  };

    //  var expanded = false;

    // function showCheckboxes() {
    //   var checkboxes = document.getElementById("checkboxes");
    //   if (!expanded) {
    //     checkboxes.style.display = "block";
    //     expanded = true;
    //   } else {
    //     checkboxes.style.display = "none";
    //     expanded = false;
    //   }
    // }
   


    APIService.setData({ req_url: url_prifix + 'api/getAllInvestments', data: {} }).then(function (suc) {
  
    console.log(suc)
    $scope.data = suc.data;
    // angular.forEach($scope.data, function (value, key) {
    //     console.log(value)
    //     httpservices.setData({ req_url: URL + 'api/getProperties', data: {} }).then(function (res) {
    //         value.investors = res.data[0].investors;
    //         console.log(res)
    //     }, function (er) {


    //     })
    // })
  })
});
    
