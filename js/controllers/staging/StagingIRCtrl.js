app.controller('StagingIRCtrl', ['$scope', 'OrderStagingService', 'LoginService', '$ionicLoading', 'LoadingService', '$rootScope', '$state', '$cordovaBarcodeScanner','$ionicModal',
    function ($scope, OrderStagingService, LoginService, $ionicLoading, LoadingService, $rootScope, $state, $cordovaBarcodeScanner,$ionicModal) {


        $scope.init = function () {
            $scope.wc = LoginService.userProfile.warehouseCode; 
            $scope.emailAlias = LoginService.userProfile.emailAlias;
            $scope.loc = OrderStagingService.loc;
            $scope.ir = '';
            $scope.getStagingIRList();

                $scope.title = "Staging Pick IR";
            

        }
        
       

       

        $scope.getStagingIRList = function () {
            LoadingService.StartLoading();
            OrderStagingService.getStagingIRList($scope.wc)
                .then(function (res) {
                    $scope.list = OrderStagingService.issuanceList;
                    console.log($scope.list);
                    if($scope.list.length === 1){
                        var REQNUM = $scope.list.find(m => m.REQNUM != " ").REQNUM;
                        
                      //  $scope.redirectMe(REQNUM);
                    }
                }
                , function (err) {
                    LoadingService.PopAlert("Something went wrong", err.data);
                })
                .finally(function () {
                    LoadingService.StopLoading();
                    $scope.$broadcast('scroll.refreshComplete');
                })
        }

        $scope.redirectMe = function (ir) {
            /*if(OrderStagingService.loc === ""){

                OrderStagingService.ir = ir;

                var confirmPopup = $ionicPopup.confirm({
                    title: 'Order transfer to staging:?',
                    subTitle: 'Transfer '+OrderStagingService.ir+' to '+OrderStagingService.loc+' ?'
                  });
                  confirmPopup.then(function(res) {
                    if(res) {
                    
                        $scope.TransfertoStaging(OrderStagingService.ir,OrderStagingService.loc,$scope.wc,$scope.emailAlias);
                               
                    } else {
                      
                    }
                  });


            }else{*/

                    OrderStagingService.ir = ir;
                    $scope.ir = ir;
                    $state.go('app.stagingloc');
                

             //   OrderStagingService.ir = ir;
             //   $state.go('app.stagingloc');
         //  }
            




        }



        $ionicModal.fromTemplateUrl('templates/staging/stagingConfirmation.html', {
            id: 'stagingConfirmation',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.stagingConfirmation = modal;
        });



        $scope.TransfertoStaging = function (ir,loc,wc,ea) {
            LoadingService.StartLoading();
            OrderStagingService.TransfertoStaging(ir,loc,wc,ea)
                .then(function (res) {
                    
                    //if(res.data == "Successfully Transferred to Staging"){
                        LoadingService.PopAlert(res.data);
                        OrderStagingService.ir = '';
                        OrderStagingService.loc = '';
                        $state.go('app.637481162215917880');
                        
                   // }
                   
                }
                , function (err) {
                    LoadingService.PopAlert("Something went wrong", err.data);
                })
                .finally(function () {
                    LoadingService.StopLoading();
                    $scope.$broadcast('scroll.refreshComplete');
                })
        }


        $scope.ScanBarcode = function () {
            $cordovaBarcodeScanner.scan().then(function (data) {
                if (!data.cancelled) {
                    $scope.searchParam = data.text;
                }
            }, function (err) {
                LoadingService.PopAlert("Something went wrong", err.data);
            })
        }

        $scope.goBack = function () {
            
          
                LoadingService.GoBack();
           
        }


        $scope.init();

    }]);

