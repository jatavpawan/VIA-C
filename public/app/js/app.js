// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
//var URL = 'http://192.168.0.10:8958/';
var URL = 'http://138.197.159.97:80/';
angular.module('starter', ['ionic', 'document.controllers', 'homepage.controllers', 'signUp.controllers', 'httpservices.module',
    'login.controllers', 'interceptor.module', 'termsandcondition.controllers',
    'cordovadialogservice.module', 'ngCordova', 'datastoreservice.module', 'dashproperty.controllers',
    'investmentprocess.controllers', 'propertydetails.controllers', 'cordovacameraservice.module',
'cordovafiletransferservice.module', 'main.controllers', 'modalService.module', '720kb.datepicker', 'investmentoverview.controllers', 'ngclipboard', 'profile.controllers', 'lr.upload'])

.run(function ($ionicPlatform, $ionicTabsDelegate) {
   // $ionicTabsDelegate.showBar(false);
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
}).config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {
    $ionicConfigProvider.form.checkbox("square");
    $ionicConfigProvider.tabs.position('bottom');
   
    $httpProvider.interceptors.push('interceptorservice');
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

   // setup an abstract state for the tabs directive
     .state('tab', {
         url: '/tab',
         abstract: true,
         templateUrl: 'templates/tabs.html'
     })

   // Each tab has its own nav history stack:

   .state('tab.dashProperty', {
       url: '/dashProperty',
       views: {
           'dashProperty': {
               templateUrl: 'templates/dashProperty.html',
               controller: 'dashpropertyCtrl'
           }
       }
   })

   .state('tab.profile', {
       url: '/profile',
       views: {
           'profile': {
               templateUrl: 'templates/profile.html',
               controller: 'profileCtrl'

           }
       }
   })

   .state('tab.propertyGraph', {
       url: '/propertyGraph',
       views: {
           'propertyGraph': {
               templateUrl: 'templates/propertyGraph.html',

           }
       }
   })

   .state('login', {
       url: '/login',
       templateUrl: 'templates/login.html',
       controller: 'loginCtrl'


   })



   .state('signup', {
       url: '/signup',
       templateUrl: 'templates/signup.html',
       controller: 'signUpCtrl'


   })

   .state('homePage', {
       url: '/homepage',
       templateUrl: 'templates/homepage.html',
       controller: 'homePageCtrl'


   })

   .state('termsandcondition', {
       url: '/termsandcondition',
       templateUrl: 'templates/termsandcondition.html',
       controller:'termsandconditionCtrl'

   })

   .state('growthpoolscreen', {
       url: '/growthpoolscreen',
       templateUrl: 'templates/growthpoolscreen.html'


   })

   .state('tab.investmentoverview', {
       url: '/investmentoverview',
       views: {
           'propertyGraph': {
               templateUrl: 'templates/investmentoverview.html',
               controller: 'investmentoverviewCtrl'
           }

       }

   })

   .state('tab.investmentProcess', {
       url: '/investmentProcess',
       views: {
           'dashProperty': {
               templateUrl: 'templates/investmentProcess.html',
               controller: 'investmentprocessCtrl'
           }

       }

   })


   .state('tab.document', {
       url: '/document',
       views: {
           'documents': {
               templateUrl: 'templates/document.html',
           }
       },



   })


     .state('tab.propertyDetail', {
         url: '/propertyDetail',
         views: {
             'dashProperty': {
                 templateUrl: 'templates/propertyDetail.html',
                 controller: 'propertydetailsCtrl'
             }
         }


     })



   .state('tab.notification', {
       url: '/notification',
       views: {
           'propertyGraph': {
               templateUrl: 'templates/tabNotification.html',

           }
       }
   });

    // if none of the above states are matched, use this as the fallback
    if (localStorage.getItem('userDetails')) {
        console.log('in condition')
        $urlRouterProvider.otherwise('/tab/dashProperty');
    } else {
        console.log('else')
    $urlRouterProvider.otherwise('/login');
       
    }

});
