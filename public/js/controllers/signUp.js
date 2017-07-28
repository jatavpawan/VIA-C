angular.module('signUp.controllers', [])

.controller('signUpCtrl', function ($scope, $state, $ionicPopup, $ionicSlideBoxDelegate, $ionicModal, $ionicSideMenuDelegate, cordovadialogservice, httpservices, datastoreservice) {



    $scope.user = datastoreservice.registerUserGet();
    $scope.registerUser = function (user) {

        var checkedOnce = true;
        var errorPara = '';

        if (user.first_name == '') {
            cordovadialogservice.alert('First Name field is required', 'Alert', 'Ok').then(function (res) {
                return;
            });
        } else if (user.last_name == '') {
            cordovadialogservice.alert('Last Name field is required', 'Alert', 'Ok').then(function (res) {
                return;
            });
        } else if (user.email == '') {
            cordovadialogservice.alert('Email field is required', 'Alert', 'Ok').then(function (res) {
                return;
            });
        } else if (user.password == '') {
            cordovadialogservice.alert('Password field is required', 'Alert', 'Ok').then(function (res) {
                return;
            });
        } else if (user.country == '') {
            cordovadialogservice.alert('Country field is required', 'Alert', 'Ok').then(function (res) {
                return;
            });
        }
        //else if (!user.check) {
        //    cordovadialogservice.alert('Check Terms and Condtions to proceed', 'Alert', 'Ok').then(function (res) {
        //        return;
        //    });
        //}
        else {
            datastoreservice.registerUserSet(user);
            console.log(user);
            httpservices.setData({ req_url: URL + 'emailCheck', data: { email: user.email } }).then(function (res) {
                console.log(res);
                if (!res.data.success) {
            $state.go('termsandcondition');
                }
                else {
                    cordovadialogservice.alert('This mail id already exist', 'Alert', 'Ok').then(function (res) {

                    })
                }

            })
        }
    }

})