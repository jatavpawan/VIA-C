angular.module('chat.controllers', [])

.controller('chatCtrl', function ($scope, $state, $ionicPopup, firebaseservices) {
    $scope.active = 1;
    $scope.arrayOfUsersCreatedTask = [];
    $scope.arrayOfUsersAppliedTask = [];
    $scope.userId = localStorage.getItem('UserId');
    firebaseservices.getDataFromNode('Users/' + localStorage.getItem('UserId')).then(function (suc) {
        console.log(suc);
        angular.forEach(suc.AppliedTasks, function (item, key) {
            console.log(item);
            if (!angular.isUndefined(item.AppliedTaskId)) {

            firebaseservices.getDataFromNode('Tasks/' + item.AppliedTaskId).then(
                function (suc1) {
                    if (suc1.hasOwnProperty("Conversations")) {
                        var ConverstationKey;
                        angular.forEach(suc1.Conversations, function (item, key) {
                            console.log(key);
                            if (key == localStorage.getItem('UserId')) {
                                angular.forEach(item, function (item, key) {
                              
                               
                                   
                                    ConverstationKey = key;
                                
                                    console.log(suc)
                                })
                            }
                        })
                   
                            console.log(suc1);
                            firebaseservices.getDataFromNode('Users/' + suc1.UserAuthorInfo.OwnerId).then(function (suc) {
                                suc.taskDetails = suc1;
                                 suc.ConverstationKey=ConverstationKey;
                                // suc.taskType = 'AppliedTask';
                                $scope.arrayOfUsersAppliedTask.push(suc);
                                console.log(suc);
                            });
                    }

                }, function (er) {

                }

                )
            }
        })

        angular.forEach(suc.CreatedTasks, function (item, key) {
            console.log(item.CreatedTaskId);
            if (!angular.isUndefined(item.CreatedTaskId)) {

            firebaseservices.getDataFromNode('Tasks/' + item.CreatedTaskId).then(
                function (suc1) {
                    console.log(suc1);
                    if (suc1.hasOwnProperty("Conversations")) {

                        angular.forEach(suc1.Conversations, function (item, key) {
                            var ConverstationKey;
                        angular.forEach(item, function (item, key) {
                             ConverstationKey = key;
                            console.log(suc)
                        })
                    firebaseservices.getDataFromNode('Users/' + key).then(function (suc) {
                        suc.taskDetails = suc1
                        suc.ConverstationKey = ConverstationKey;
                       // suc.taskType = 'CreatedTask';
                        $scope.arrayOfUsersCreatedTask.push(suc);
                        console.log(suc);
                    });
                    })
                    }

                }, function (er) {

                }
                )
            }
        })
        setTimeout(function () {
            console.log($scope.arrayOfUsersCreatedTask);

        },5000)
    }, function (er) {

    })




    if(localStorage.getItem('firstTimeChat')!='false') {
		var myPopup = $ionicPopup.alert({
            templateUrl: 'views/chatPopup.html',
           cssClass:'hide-title',

             scope: $scope,

        });
        $scope.closePopup = function () {
            myPopup.close();
        }
		localStorage.setItem('firstTimeChat','false');
    }
    $scope.userProfile = function (id) {
        $state.go('seeUserProfile', {'userId':id})
    }
})






 