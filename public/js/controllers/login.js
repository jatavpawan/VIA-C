angular.module('login.controllers', [])

.controller('loginCtrl', function ($scope, $state, $rootScope, httpservices, cordovadialogservice) {
    //  $rootScope.val = 'ior';
    // $rootScope.val = 'novalueset';
   // alert();
    $scope.user = { email: '', password: '' };

    $scope.signIn = function (user) {
      //  alert(angular.isUndefined(user.email))
       
            if (user.email != '' && !angular.isUndefined(user.email))
            {
                if (user.password != '' || !angular.isUndefined(user.password))
                {
                    var data = { req_url: URL + 'authenticate', data: user }
                    httpservices.setData(data).then(function (success) {
                       
                        //console.log(success.data.token)
                        if (angular.isUndefined(success.data.success)) {
                            console.log(success);
                            localStorage.setItem('userDetails',JSON.stringify(success.data));
                            $state.go('tab.dashProperty')
                        }
                        else {
                            console.log(success);
                            console.log('error');
                            cordovadialogservice.alert(success.data.message, 'Alert', 'Ok')
                        }

                    }, function (error) {
                        console.log(error);
                    })
                }
                else {

                    cordovadialogservice.alert('Password field is required', 'Alert', 'Ok').then(function (res) {
                        return;
                    });
                }
            } else {
                cordovadialogservice.alert('Email field is required', 'Alert', 'Ok').then(function (res) {
                    return;
                });
            }

            //var checkedOnce = true;
            //angular.forEach($scope.user, function (item, key) {
            //    if (item == '' && checkedOnce) {
            //        cordovadialogservice.alert(key + ' field required', 'Alert', 'Ok').then(function (res) {

            //        });
            //        checkedOnce = false;
            //    }
            //})
            //if (checkedOnce) {
            //    var data = { req_url: URL + 'register.php', data: user }
            //    var data = { req_url: URL + 'login.php', data: user }
            //    httpservices.setData(data).then(function (success) {
            //        if (success.success == 1) {

            //            if (localStorage.getItem('training') == undefined || localStorage.getItem('training') == null) {
            //                //  alert('train unde')
            //                $state.go('training1');
            //            }
            //            else {
            //                //alert('train def')
            //                $state.go('home');
            //            }
            //        }
            //        else {
            //            cordovadialogservice.alert('Login Failed', 'Alert', 'Ok')
            //        }

            //    }, function (error) {


            //    })
            //}
            //console.log(user);
        

       
       
    }

    $scope.clearField = function () {
       
        $scope.user[property] = '';
    }
    $rootScope.location = false;
})