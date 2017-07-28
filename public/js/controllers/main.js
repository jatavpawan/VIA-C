angular.module('main.controllers', [])

.controller('mainCtrl', function ($scope, $state, $cordovaSocialSharing, cordovadialogservice, $ionicBackdrop, $ionicLoading) {
    $scope.fbSharing = function () {
        $ionicLoading.show();
        $cordovaSocialSharing
    .shareViaFacebook('Hey! Check out GrowthPool.com where you can invest in real estate for as low as $1000!', URL + '', '')
    .then(function (result) {
        // Success!
        $ionicLoading.hide();
    }, function (err) {
        $ionicLoading.hide();
        cordovadialogservice.alert('App not installed on your mobile', 'Message', 'OK')
        // An error occurred. Show a message to the user
    });

    }
    $scope.logout = function () {
        localStorage.setItem('userDetails', '');
        $state.go('login');
    }
    $scope.linkedInSharing = function () {


    }
    $scope.whatsappSharing = function () {
        $ionicLoading.show();
        window.plugins.socialsharing.shareViaWhatsApp('Hey! Check out GrowthPool.com where you can invest in real estate for as low as $1000!', null /* img */, null /* url */, function () { console.log('share ok'); $ionicLoading.hide(); }, function (err) { $ionicLoading.hide(); cordovadialogservice.alert('App is not installed on your mobile', 'Message', 'Ok') });
    }
    $scope.twitterSharing = function () {
        $ionicLoading.show();
        $cordovaSocialSharing
    .shareViaTwitter('Hey! Check out GrowthPool.com where you can invest in real estate for as low as $1000!', URL + '', '')
    .then(function (result) {
        // Success
        $ionicLoading.hide();
    }, function (err) {
        console.log(err)
        $ionicLoading.hide();
        cordovadialogservice.alert('App not installed on your mobile', 'Message', 'OK')
        // An error occurred. Show a message to the user
    });

    }
    $scope.instaSharing = function () {
        window.plugins.socialsharing.shareViaInstagram('Hey! Check out GrowthPool.com where you can invest in real estate for as low as $1000!', '', function () { console.log('share ok') }, function (errormsg) {
            console.log(errormsg)
            cordovadialogservice.alert('App not installed on your mobile', 'Message', 'OK')
        })
    }
})






