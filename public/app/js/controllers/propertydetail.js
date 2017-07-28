angular.module('propertydetails.controllers', [])

.controller('propertydetailsCtrl', function ($scope, $state, $rootScope,$ionicModal, httpservices,$sce, $ionicScrollDelegate, datastoreservice, cordovadialogservice) {
    $scope.data = JSON.parse(localStorage.getItem("registerUserSet"));
   // var propertydet=JSON.parse(datastoreservice)
    console.log($scope.data);
    $scope.data.image_urlimage_url = URL + $scope.data.image_urlimage_url;
    $scope.data.min_invest_amount = 10;
    $scope.data.Investment_amount = $scope.data.min_invest_amount;
    $scope.data.ownership_percent = (parseInt($scope.data.Investment_amount) * 100 / $scope.data.funding_amount).toFixed(2);
    $scope.data.totalInvestment = $scope.data.funding_amount - $scope.data.totalInvestment;
    var term= $scope.data.term / 12;
    $scope.data.estimated_return = (($scope.data.anual_return * $scope.data.Investment_amount * term.toFixed(0)) / 100)
    $scope.calculateProfit = function (investAmount) {
        if (investAmount) {
           // $scope.data.Investment_amount = investAmount;
        $scope.data.ownership_percent = (parseInt(investAmount) * 100 / $scope.data.funding_amount).toFixed(2);
        $scope.data.estimated_return = (( parseInt($scope.data.anual_return) * parseInt( investAmount) * term.toFixed(0)) / 100).toFixed(0)
        } else {
            var investAmount = $scope.data.min_invest_amount;
            $scope.data.ownership_percent = (parseInt(investAmount) * 100 / $scope.data.funding_amount).toFixed(2);
            $scope.data.estimated_return = ((parseInt($scope.data.anual_return) * parseInt(investAmount) * term.toFixed(0)) / 100).toFixed(0)
            $scope.data.Investment_amount=$scope.data.min_invest_amount
        }
    }
    $ionicModal.fromTemplateUrl('views/modalForWeb.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modalRes = modal;

    });
    $scope.trustAsHtml = function (msg) {
        return $sce.trustAsHtml(msg);
    }
    $scope.investNow = function () {
        if ($scope.data.Investment_amount >= $scope.data.min_invest_amount) {
        datastoreservice.registerUserSet($scope.data);
        $state.go('tab.investmentProcess')

        }
        else {
            $scope.title = "Alert";
            $scope.message = "Amount should be greater than minimum amount.";
            if (!ionic.Platform.isWebView()) {
                $scope.modalRes.show()
            } else {
                cordovadialogservice.alert('Amount should be greater than minimum amount.', 'Alert', 'OK')

            }
        }
    }
    $scope.closeModal=function(val){
        $scope.modalRes.hide();
    }
})