app.controller('StockTransferAutoCtrl', ['$scope', '$rootScope','$ionicPopup','LoginService', 'LoadingService', '$cordovaBarcodeScanner', '$cordovaToast', 'QuickTransferSrv',
    function ($scope,$rootScope,$ionicPopup, LoginService, LoadingService, $cordovaBarcodeScanner, $cordovaToast, QuickTransferSrv) {

        $scope.init = function () {
            $scope.params = {};
            $scope.batch = {};
            $scope.Scanshow();
           
            
        }
        

$scope.Scanshow = function(){

    if($rootScope.scanparent.length === 0){
return false;
    }else{
        var ans = _.findWhere($rootScope.scanparent, { stage: "637470114963418820" });        
        if (ans) {
          return true;
        } else {
          return false;
        }
    }

  /*  $scope.scan = $rootScope.menuList;
            var data = _.findWhere($rootScope.menuList, {
                stage: "637469366253816551"
              }).pages;
              var ans = _.findWhere(data, { stage: "637470114963418820" });        
              if (ans) {
                return true;
              } else {
                return false;
              } */
}


        $scope.GetBatchInquiry = function (batchno) {
            $scope.ClearBatch();
            console.log(batchno);
            if (batchno) {
                QuickTransferSrv.GetBatchInquiry(batchno)
                    .then(function (res) {
                        console.log(res);
                        $scope.batch = res.data;
                        $scope.batch.ManufacturingDate = new Date(QuickTransferSrv.batchInfo.ManufacturingDate);
                        $scope.batch.ExpiryDate = new Date(QuickTransferSrv.batchInfo.ExpiryDate);
                        $cordovaToast.show('Received data', 'short', 'bottom');
                    }, function (err) {
                        console.log(err);
                        LoadingService.PopAlert("Something went wrong", err.data);
                    })
            }
        }



        $scope.GetBatch = function (batchno) {
            LoadingService.StartLoading();
            $scope.ClearBatch();
            console.log(batchno);
            if (batchno) {
                QuickTransferSrv.GetBatch(batchno)
                    .then(function (res) {
                        LoadingService.StopLoading();
                        if(res.data == "Batch No. is not found"){
                            $cordovaToast.show(res.data, 'short', 'bottom');
                        } else if(res.data.SuggestedLocationCode == null){

                            $cordovaToast.show('No Location can be allocated', 'short', 'bottom');

                          } 
                        else{
                            $scope.batch = res.data;
                            $scope.batch.ManufacturingDate = new Date(QuickTransferSrv.batchInfo.ManufacturingDate);
                            $scope.batch.ExpiryDate = new Date(QuickTransferSrv.batchInfo.ExpiryDate);
                            $cordovaToast.show('Received data', 'short', 'bottom');
                            
                            

                        }
                       
                        
                    }, function (err) {
                        console.log(err);
                        LoadingService.PopAlert("Something went wrong", err.data);
                        LoadingService.StopLoading(); 
                    })
            }
        }

        $scope.StockTransfer = function () {
            LoadingService.StartLoading(); 
            QuickTransferSrv.StocksTransferring($scope.batch)
                .then(
                function (res) {
                    $scope.ClearAll();
                    LoadingService.StopLoading(); 
                    $cordovaToast.show(res.data, 'short', 'bottom');
                    
                }, function (err) {
                    LoadingService.StopLoading();
                    LoadingService.PopAlert("Can't Transfer Item", err.data);
                     
                })
        }


      


        $scope.ClearBatch = function () {
            $scope.batch = {};
        }

        //for batch label
        $scope.ScanBarcode = function () {
            $cordovaBarcodeScanner.scan().then(function (data) {
                if (!data.cancelled) {
                    $scope.params.batchno = data.text;
                    $scope.GetBatch($scope.params.batchno);
                }
            }, function (err) {
                LoadingService.PopAlert("Cannot scan barcode", err.data);
            })
        }


        $scope.ScanningLocation = function () {
            $cordovaBarcodeScanner.scan().then(function (data) {
                if (!data.cancelled) {
                    $scope.batch.SuggestedLocationCode = data.text;
                }
            }, function (err) {
                LoadingService.PopAlert("Cannot scan barcode", err.data);
            })
        }

        $scope.ScanLocation = function () {
            $cordovaBarcodeScanner.scan().then(function (data) {
                if (!data.cancelled) {
                    if($scope.batch.SuggestedLocationCode = data.text){
                        redirectMe();
                    }else{
                        LoadingService.PopAlert("Location Barcode is Incorrect", err.data);
                    }
                    
                }
            }, function (err) {
                LoadingService.PopAlert("Cannot scan barcode", err.data);
            })
        }



        $scope.redirectMe = function() {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Transfer Pal Num:'+$scope.batch.BatchNo+'?',
                subTitle: 'Transfer from '+$scope.batch.LocationDescription+' to '+$scope.batch.SuggestedLocationDescription+' ?'
              });
              confirmPopup.then(function(res) {
                if(res) {
                
                    $scope.StockTransfer();
                           
                } else {
                   
                }
              });
            };


        $scope.ClearAll = function () {
            $scope.batch = {};
            $scope.params.batchno = "";
            $scope.params.location = "";
        }



        $scope.goBack = function () {
            LoadingService.GoBack();
        }

        $scope.init();
    }
])