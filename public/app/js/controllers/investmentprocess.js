angular.module('investmentprocess.controllers', [])

.controller('investmentprocessCtrl', function ($scope, $state, $rootScope,$sce, $ionicLoading, $ionicModal,modalService, cordovafiletransferservice,$q, cordovacameraservice, httpservices, $ionicScrollDelegate, datastoreservice, cordovadialogservice) {
    $scope.page = 'personal_details';
    var signaturePadAgree = '';
    var signaturePadConfi = '';
    var json = JSON.parse(localStorage.getItem('userDetails'))
    $scope.data = json.user;
    $scope.data.user_id = json.user._id;

    delete $scope.data._id;
    delete $scope.data.status;
    var momnetToday = moment();
    $scope.data.today_date = momnetToday.date();
    $scope.data.month = momnetToday.month()+1;
    $scope.data.year = momnetToday.year();
    console.log(datastoreservice.registerUserGet())
    var prop_det = datastoreservice.registerUserGet();
    angular.forEach(prop_det, function (key, value) {
        if (value != '_id') {
        $scope.data[value] = key;

        } else {
            $scope.data['property_id'] = key;
        }

    })
    $scope.isWebView = ionic.Platform.isWebView();
    console.log($scope.data);
    $scope.lastPage = [];
    $scope.scrollToTop = function (value, lastpage) {
        $scope.page = value;
        $scope.lastPage.push(lastpage);
        $ionicScrollDelegate.scrollTop();
    }
    $ionicModal.fromTemplateUrl('views/modalForWeb.html', {
        scope: $scope
    }).then(function (modal) {
       $scope.modalRes = modal;
       
    });
    $ionicModal.fromTemplateUrl('views/datepicker.html',
       { scope: $scope }).then(function (modal) {
           $scope.datePickerModal = modal;
       })
    $scope.dateModalOpen = function () {
        $scope.datePickerModal.show();
       
    }
    $scope.dateModalClose = function () {
        $scope.datePickerModal.hide();
    }
    $scope.trustAsHtml = function (msg) {
        return $sce.trustAsHtml(msg);
    }
    $scope.payNowShow = false;
    $scope.paymentId = 123
    $scope.pleaseCheckBox = function () {
        $scope.title = "Alert";
       // $sce.trustAsHtml(string);
         $scope.message = '<p>Please tick checkbox to continue</p>';
       // $scope.message = "<p style='color:black;'>Your payment done successfully please note your transaction id for future reference <span style='color:black'>hello</span></p>";
       // $scope.message = "<p style:'color:black;'>Your payment done successfully please note your transaction id for future reference <span style='color:black'>" + payment.id + "</span><span ngclipboard data-clipboard-text='" + payment.id + "'><i class='icon ion-ios-copy'></i></span></p>";
        if (!ionic.Platform.isWebView()) {
            $scope.modalRes.show()
        } else {
        cordovadialogservice.alert('Please tick checkbox to continue', 'Alert', 'OK')

        }
        console.log($scope);
        //setTimeout(function () {
        //    $scope.modal.show();
        //}, 2000)
       // $scope.modalRes.show();
      
    }
    $scope.closeModal = function (val) {
        $scope.modalRes.hide()
        if (val) {
            $state.go('tab.dashProperty', { reload: true });
        }
        $scope.payNowShow = false;
    }
    $scope.backwindow = function () {
        $state.go('tab.propertyDetail')
    }
    $scope.goBack = function () {
        console.log($scope.lastPage);
        if ($scope.lastPage.length==0) {
            $state.go('tab.propertyDetail');
            return
        }
        $scope.page = $scope.lastPage[$scope.lastPage.length - 1];
        $scope.lastPage.pop();


    }
    $scope.showAlert = function () {
        if ($scope.data.min_invest_amount > $scope.data.Investment_amount) {
            // cordovadialogservice.alert('', 'Alert', 'OK');
            $scope.title = "Alert";
            $scope.message = "You can not set value less than minimum amount of property";
            if (!ionic.Platform.isWebView()) {
                $scope.modalRes.show();
                $scope.data.Investment_amount = $scope.data.min_invest_amount;
            } else {
                cordovadialogservice.alert('You can not set value less than minimum amount of property', 'Alert', 'OK')

            }
           // $scope.data.Investment_amount = $scope.data.min_invest_amount;
        }
      
        
    }

    $scope.openModal = function (name) {
        $scope.modal.show();
        $scope.signaturePadName = name;
        if (name == 'confidential') {
            signaturePadConfi = new SignaturePad(document.getElementById('signature-pad1'), {
                backgroundColor: 'rgba(255, 255, 255, 0)',
                penColor: 'rgb(0, 0, 0)'
            });
        } else {
        signaturePadAgree = new SignaturePad(document.getElementById('signature-pad2'), {
            backgroundColor: 'rgba(255, 255, 255, 0)',
            penColor: 'rgb(0, 0, 0)'
        });

        }
    }
    $ionicModal.fromTemplateUrl('views/signaturemodal.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;

    });
   
    $scope.checkDisability = function () {

        if(!$scope.data.signature_image){
            return true;
        }else if($scope.data.Investment_amount < $scope.data.min_invest_amount){
            return true;
        }else if(!$scope.data.Investment_amount){
            return true;
        }
      
    }
    $scope.data.goverment_ids = []
    $scope.onComplete = function (suc) {
        console.log(suc)
        $scope.data.goverment_ids.push(suc.data);
    }
    paypal.Button.render({

        env: 'production', // sandbox | production

        // PayPal Client IDs - replace with your own
        // Create a PayPal app: https://developer.paypal.com/developer/applications/create
        client: {
            sandbox: 'AT_NSTCqnU7OAgzNrUAwxZ6SDuSlhf9LeI1j-eBOyPefutazJiGh9sf2wOfsMpooO1nToe7RNk0pqO4v',
            production: 'ARVwLh52iUM0POd5CuCsB3fQ3vynT6RUHqTGIEBOn3IILCxDH-6wbsGzsnsUFmnuKwy_tJtRd5wGdjgC'
        }
        /* Our - client: {
            sandbox: 'ASlROn5J-Bhp_xIFC9TIs0W-r4jAXqu5pfNPZDGDQYGVWuhMPZa0ag46QJk_5XpaNSaHR4b_5Rn6JXUh',
            production: 'ASlROn5J-Bhp_xIFC9TIs0W-r4jAXqu5pfNPZDGDQYGVWuhMPZa0ag46QJk_5XpaNSaHR4b_5Rn6JXUh'
        }*/,

        // Show the buyer a 'Pay Now' button in the checkout flow
        commit: true,

        // payment() is called when the button is clicked
        payment: function (data, actions) {
          

            return actions.payment.create({
                transactions: [
                    {
                        amount: { total: parseInt($scope.data.Investment_amount), currency: 'CAD' }
                    }
                ]
            });


          
            // Make a call to the REST api to create the payment
        },

        // onAuthorize() is called when the buyer approves the payment
        onAuthorize: function (data, actions) {
            console.log(data);
            console.log(actions);
            // Make a call to the REST api to execute the payment
            return actions.payment.execute().then(function (payment) {
                console.log(payment)
                $scope.investNow().then(function (suc) {
                var investment = JSON.parse(localStorage.getItem('investmentDetails'));
                investment.transaction_data = payment;
              //  cordovadialogservice.alert('Your payment done successfully please note your transaction id for future reference ' + payment.id, 'Alert', 'OK')
                $scope.title = "Alert";
               // $scope.clipButton = true;
                $scope.payNowShow = true;
                $scope.paymentId = payment.id;
                $scope.message = "<p style='color:gray;'> Thank you. Your transaction has been successfully submitted. Please take note of your transaction id number for future reference. <br/> <span style='color:black'>" + payment.id + "</span></p>";
                if (!ionic.Platform.isWebView()) {
                    $scope.modalRes.show()
                } else {
                    cordovadialogservice.alert(' Thank you. Your transaction has been successfully submitted. Please take note of your transaction id numberer future reference.' + payment.id, 'Alert', 'OK')

                }
                localStorage.setItem('investmentDetails', JSON.stringify(investment));
                httpservices.updateData({ req_url: URL + 'api/updateInvestment', data: { investment_id: investment.investment_id, status: payment.state, transaction_id: payment.id } }).then(function (suc) {
                    // var investDetail = JSON.parse(localStorage.getItem('investmentDetails'));
                    console.log(suc);
                    if (suc.data.message) {

                        localStorage.removeItem('investmentDetails');
                        if (ionic.Platform.isWebView()) {
                            setTimeout(function () {
                                $state.go('tab.dashProperty', { reload: true });

                            }, 2000)
                        }
                    }
                }, function (er) {


                })
                console.log("payment success: " + JSON.stringify(payment, null, 4));
                }, function (er) { })
                });
          
        }
    }, '#paypal-button');
    $scope.uploadIds = function () {
        // alert('called')

        cordovacameraservice.getImagePathFromMobile().then(function (suc) {
            $ionicLoading.show();
            var data = JSON.parse(localStorage.getItem('userDetails'));
            cordovafiletransferservice.uploadPhoto(URL + 'api/uploadPhoto', suc, data.token).then(function (suc) {
                $ionicLoading.hide();
                console.log(suc);
                if (suc.responseCode == 200) {
                    console.log($scope.data.goverment_ids);
                    $scope.data.goverment_ids.push(JSON.parse(suc.response));
                    //  console.log(JSON.parse(suc.response));
                }

            }, function (er) {
                $ionicLoading.hide();
            })
        })
    }
    $scope.deleteId = function (index) {
        $scope.data.goverment_ids.splice(index, 1);
    }
    if (!ionic.Platform.isWebView()) {
        $scope.payButton = true;
        $scope.payButtonMobile = false;
    } else {
        $scope.payButton = false;
        $scope.payButtonMobile = true;
       // app.bindEvents(suc);
    }
    $scope.investNow = function () {
        var defer = $q.defer();
        datastoreservice.registerUserSet($scope.data);
        console.log($scope.data)
        httpservices.setData({ req_url: URL + 'api/makeInvestment', data: $scope.data }).then(function (suc) {
            console.log(suc)
            var info = suc.data ;
            info.transaction_data = {}
           // var investdetail=localStorage.getItem('investmentDetails');
            //if (investdetail) {
              
            //    var temp = JSON.parse(localStorage.getItem('investmentDetails'));
            //    temp.push(info)
            //    localStorage.setItem('investmentDetails', JSON.stringify(temp));
            //} else {
            //    localStorage.setItem('investmentDetails', JSON.stringify(''));
            //}
            localStorage.setItem('investmentDetails', JSON.stringify(info));

            defer.resolve('done');
            //var temp = JSON.parse(localStorage.getItem('investmentDetails'));
            //if (temp) {
            //localStorage.setItem('investmentDetails', JSON.stringify(info))
            //} else {

            //}
            if (!ionic.Platform.isWebView()) {
                $scope.payButton = true;
                $scope.payButtonMobile = false;
            } else {
                $scope.payButton = false;
                $scope.payButtonMobile = true;
            app.bindEvents(suc);
            }
        }, function (er) {
            defer.reject('rejected');
        })
        return defer.promise;
    }

    $scope.save = function () {
        $scope.modal.hide();
        if ($scope.signaturePadName == 'confidential') {
            $scope.data.signature_image = signaturePadConfi.toDataURL('image/png');

        } else {
            $scope.data.investment_signature = signaturePadAgree.toDataURL('image/png');
        }
        //  console.log(data);
    }

    $scope.clear = function () {
        $scope.modal.hide();
        if ($scope.signaturePadName == 'confidential') {
         //   $scope.data.signature_image = .toDataURL('image/png');
            signaturePadConfi.clear();
        } else {
          //  $scope.data.signature_image = .toDataURL('image/png');
            signaturePadAgree.clear();
        }
       
    }
    //paypal integration
    var app = {
        // Application Constructor
        //initialize: function () {
        //    this.bindEvents();
        //},
        // Bind Event Listeners
        //
        // Bind any events that are required on startup. Common events are:
        // 'load', 'deviceready', 'offline', and 'online'.
        bindEvents: function () {
            document.addEventListener('deviceready', this.onDeviceReady, false);
        },
        onDeviceReady: function () {
            app.initPaymentUI();
        },

        initPaymentUI: function () {
            var clientIDs = {
                "PayPalEnvironmentProduction": "ARVwLh52iUM0POd5CuCsB3fQ3vynT6RUHqTGIEBOn3IILCxDH-6wbsGzsnsUFmnuKwy_tJtRd5wGdjgC",
                "PayPalEnvironmentSandbox": "AT_NSTCqnU7OAgzNrUAwxZ6SDuSlhf9LeI1j-eBOyPefutazJiGh9sf2wOfsMpooO1nToe7RNk0pqO4v"
            };
            PayPalMobile.init(clientIDs, app.onPayPalMobileInit);

        }, onSuccesfulPayment: function (payment) {
            var investment = JSON.parse(localStorage.getItem('investmentDetails'));
            investment.transaction_data = payment;
            cordovadialogservice.alert('Your payment done successfully please note your transaction id for future reference ' + payment.response.id, 'Alert', 'OK')
            localStorage.setItem('investmentDetails', JSON.stringify(investment));
            httpservices.updateData({ req_url: URL + 'api/updateInvestment', data: { investment_id: investment.investment_id, status: payment.response.state, transaction_id: payment.response.id } }).then(function (suc) {
                // var investDetail = JSON.parse(localStorage.getItem('investmentDetails'));
                console.log(suc);
                if (suc.data.message) {

                    localStorage.removeItem('investmentDetails');
                    setTimeout(function () {
                    $state.go('tab.dashProperty', { reload: true });

                    },2000)
                }
            }, function (er) {


            })
            console.log("payment success: " + JSON.stringify(payment, null, 4));
        },
        // This code is only used for independent card.io scanning abilities
        onCardIOComplete: function (card) {
            console.log("Card Scanned success: " + JSON.stringify(card, null, 4));
        },
        onAuthorizationCallback: function (authorization) {
            console.log("authorization: " + JSON.stringify(authorization, null, 4));
        },
        createPayment: function () {
            // for simplicity use predefined amount
            // optional payment details for more information check [helper js file](https://github.com/paypal/PayPal-Cordova-Plugin/blob/master/www/paypal-mobile-js-helper.js)
            var paymentDetails = new PayPalPaymentDetails(parseInt($scope.data.Investment_amount)+50, "0.00", "0.00");
            var payment = new PayPalPayment(parseInt($scope.data.Investment_amount) + 50, "CAD", $scope.data.property_description_address, "Sale", paymentDetails);
            return payment;      },
        configuration: function () {
            // for more options see `paypal-mobile-js-helper.js`
            var config = new PayPalConfiguration({ merchantName: "Growth Pool Inc", merchantPrivacyPolicyURL: "https://mytestshop.com/policy", merchantUserAgreementURL: "https://mytestshop.com/agreement" });
            return config;
        }, onPrepareRender: function () {
           
            PayPalMobile.renderSinglePaymentUI(app.createPayment(), app.onSuccesfulPayment, app.onUserCanceled);


           
        },
        onPayPalMobileInit: function () {
           
            PayPalMobile.prepareToRender("PayPalEnvironmentProduction", app.configuration(), app.onPrepareRender);
        },
        onUserCanceled: function (result) {
            console.log(result);
        }
    }


}).directive('stringToNumber', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function (value) {
                return '' + value;
            });
            ngModel.$formatters.push(function (value) {
                return parseFloat(value);
            });
        }
    };
});