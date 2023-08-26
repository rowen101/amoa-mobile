app.controller('StagingLoctoIRCtrl', ['$scope', 'OrderStagingService', 'LoginService', '$ionicLoading', 'LoadingService', '$rootScope', '$state', '$cordovaBarcodeScanner','$ionicModal',
    function ($scope, OrderStagingService, LoginService, $ionicLoading, LoadingService, $rootScope, $state, $cordovaBarcodeScanner,$ionicModal) {


        $scope.init = function () {
            $scope.wc = LoginService.userProfile.warehouseCode; 
            $scope.emaialalias = LoginService.userProfile.emailAlias;
            $scope.loc = OrderStagingService.loc;
            $scope.ir = '';
            $scope.notes = '';
            $scope.getStagingIRList();

           
                $scope.title = "Staging "+$scope.loc;
          

        }

      


        
        
        $scope.ScanLocation = function (loc) {

            $cordovaBarcodeScanner.scan().then(function (data) {
                if (!data.cancelled) {
                    var d =  $scope.locList.find(m => m.LocCode == data.text);
                    if(d != undefined){
                        $scope.redirectMe(data.text);
                    }else{
                        
                        LoadingService.PopAlert("Location Not Found");
                    }
                    
                    
                }

                
            
            }, function (err) {
                LoadingService.PopAlert("Cannot scan barcode", err.data);
            })
        }

       

        $scope.getStagingIRList = function () {
            LoadingService.StartLoading();
            OrderStagingService.getStagingIRList($scope.wc)
                .then(function (res) {
                    $scope.list = OrderStagingService.issuanceList;
                    console.log($scope.list);
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
                    $scope.stagingConfirmation.show();
              
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



        $scope.TransfertoStaging = function (ir,loc,wc,ea,notes) {
            console.log(ir,loc,wc,ea,notes);
            LoadingService.StartLoading();
           // console.log(ir,loc,wc,ea,notes);
           OrderStagingService.TransfertoStaging(ir,loc,wc,ea,notes)
                .then(function (res) {
                    
                    if(res.data == "1"){
                        
                        OrderStagingService.ir = '';
                        OrderStagingService.loc = '';
                        $scope.stagingConfirmation.hide();
                        $state.go('app.637481162215917880');
                        LoadingService.PopAlert("Transferred to Staging");
                        
                   }else{
                    LoadingService.PopAlert("Failed Transfer");
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
            
            
                $state.go('app.637481162215917880');
           
        }


        $scope.init();

    }]);

