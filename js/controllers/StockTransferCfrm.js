//PickList Controller
app.controller('StockTransferConfirmationCtrl', ['$scope', 'LoadingService', 'StockTransferSrv', '$rootScope', '$cordovaBarcodeScanner', '$ionicModal', 'LoginService', '$cordovaToast', '$state', '$timeout',"$cordovaCamera","$ionicPopup",
function ($scope, LoadingService, StockTransferSrv, $rootScope, $cordovaBarcodeScanner, $ionicModal, LoginService, $cordovaToast, $state, $timeout,$cordovaCamera,$ionicPopup) {
    
 
    var tk = 20;
    var page = 0;
    
    
    $scope.itemMaster = {};
    $scope.itemCodeList = [];
    $scope.moreDataCanBeLoaded = false;
    
      
    $scope.turnClearAppData = 'ASC';
    
    
    
    $scope.init = function () {
      /*  LoadingService.StartLoading();
        $scope.GetItemCodeList('', 1);*/
        $scope.type = {};
            $scope.type.selected = '1';
            $scope.userid = LoginService.userProfile.emailAlias;
            $scope.wc = LoginService.userProfile.warehouseCode;
           // $scope.GetViews('', 1);
    
           $scope.GetTransferList('ASC');
    
    }
    
    
    $scope.Scanshow = function(){
        if($rootScope.scanparent.length ===0){
    return false;
        }else{
           
              var ans = _.findWhere($rootScope.scanparent, { stage: "637532317886663701" });        
              if (ans) {
                return true;
              } else {
                return false;
              }  
        }
      
    }
    
    
    
    $scope.GetTransferList = function(data){
        LoadingService.StartLoading();
        StockTransferSrv.GetTransferList()
        .then(function (res) {
            $scope.itemCodeList = res.data;
            $scope.showConfirm(data);          
        }, function (err) {
            LoadingService.PopAlert("Something went wrong","Error Message: "+err.data+ " Sorry we cant get the Stock Transfer List of Warehouse '" + $scope.wc + "'. Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
        }).
        finally(function () {
           
            LoadingService.StopLoading();
            $scope.$broadcast('scroll.refreshComplete');
        })
      
    }
    
    
    
    /*$scope.ScanLocation = function () {
        $cordovaBarcodeScanner.scan().then(function (data) {
            if (!data.cancelled) {
                if($scope.itemMaster.Destination == data.text.toUpperCase()){
                    $scope.ImageUpdate($scope.itemMaster);
                }else{
                    LoadingService.PopAlert("Invalid Location Barcode");
                }
                
            }
        }, function (err) {
            LoadingService.PopAlert(err.data+"Cannot scan barcode", err.data);
        })
    }*/
    
    
    $scope.ScanLocation = function () {//for searching
        $cordovaBarcodeScanner.scan().then(function (data) {
            if (!data.cancelled) {
                if($scope.itemMaster.Destination == data.text.toUpperCase()){
                    $scope.ImageUpdate($scope.itemMaster);
                }else{
                    LoadingService.PopAlert("Invalid Location Barcode");
                }
            }
        }, function (err) {
            LoadingService.PopAlert("Something went wrong", err.data);
        })
    }
    
    
    
    
    
    
    $scope.showConfirm = function(val) {
       
        if( val === 'ASC'){
            $scope.turnClearAppData = 'ASC';
            if ($scope.type.selected == 1) {
               
                $scope.itemCodeList = _.sortBy($scope.itemCodeList, 'BatchNo');
            }else if ($scope.type.selected == 2){
                
                $scope.itemCodeList = _.sortBy($scope.itemCodeList, 'Destination');
            }else if ($scope.type.selected == 3){
                
                $scope.itemCodeList = _.sortBy($scope.itemCodeList, 'ItemCode');
            }else{
                
                $scope.itemCodeList = _.sortBy($scope.itemCodeList, 'Description');
            }
            
    
        }else{
            
            $scope.turnClearAppData = 'DESC';
            
            if ($scope.type.selected == 1) {
               
                $scope.itemCodeList = _.sortBy($scope.itemCodeList, 'BatchNo').reverse();
            }else if ($scope.type.selected == 2){
                
                $scope.itemCodeList = _.sortBy($scope.itemCodeList, 'Destination').reverse();
            }else if ($scope.type.selected == 3){
                
                $scope.itemCodeList = _.sortBy($scope.itemCodeList, 'ItemCode').reverse();
            }else{
                
                $scope.itemCodeList = _.sortBy($scope.itemCodeList, 'Description').reverse();
            }
        }
    
    
      };
    
    
    $scope.resetCanBeLoaded = function (param) {
        if (param != $scope.selectedParam) {
            $scope.moreDataCanBeLoaded = true;
        }
    }
    
    $scope.setParam = function (param) {
        $scope.selectedParam = param;
    }
    
    $scope.GetViews = function (param, pg) {
        
        /*LoadingService.StartLoading();
        if ($scope.type.selected == 1) {
           
            $scope.GetItemCodeList(param,pg,1);
        }else if ($scope.type.selected == 2){
            
            $scope.GetItemCodeList(param,pg,2);
        }else{
            
            $scope.GetItemCodeList(param,pg,3);
        }*/
        
    }
    
    
    /*$scope.GetItemCodeList = function (param, pg,selected) {
        console.log(selected)
        var currentCanBeLoaded = $scope.moreDataCanBeLoaded;
        if (!param) {
            param = '';
            
    
        }
        if ($scope.selectedParam != param) {
            $scope.setParam(param);
            pg = 1;
            page = 1;
            $scope.itemCodeList = [];
    
        }
        PutAwayConfirmationService.GetAutoPutAwayList(param, tk, pg,selected,$scope.turnClearAppData)
            .then(function (res) {
                
               
                $scope.itemCount = PutAwayConfirmationService.itemPutawayListObj.totalItem;
                for (var i = 0; i < PutAwayConfirmationService.itemPutawayListObj.list.length; i++) {
                    $scope.itemCodeList.push(PutAwayConfirmationService.itemPutawayListObj.list[i]);
                }
                $scope.moreDataCanBeLoaded = PutAwayConfirmationService.itemPutawayListObj.canNext;
            }, function (err) {
                console.log(err);
                page--
                $scope.moreDataCanBeLoaded = false;
                LoadingService.PopAlert("Something went wrong", "" + err.data.ExceptionMessage + " Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
                $timeout(function () { $scope.moreDataCanBeLoaded = currentCanBeLoaded }, 1000);
            }).finally(function () {
                LoadingService.StopLoading();
                $scope.$broadcast('scroll.infiniteScrollComplete');
                $scope.$broadcast('scroll.refreshComplete');
            })
    
    
    
    
        
    
       
    } */
    
    
    $scope.GetItemCodeList = function (param, pg,selected) {
        
       /* var currentCanBeLoaded = $scope.moreDataCanBeLoaded;
        if (!param) {
            param = '';
        }
        if ($scope.selectedParam != param) {
            $scope.setParam(param);
            pg = 1;
            page = 1;
            $scope.itemCodeList = [];
        }
    
    
        
    
        PutAwayConfirmationSRV.GetActiveItemMasterList(param, tk, pg,selected,$scope.turnClearAppData)
            .then(function (res) {
                $scope.itemCount = PutAwayConfirmationSRV.itemListObj.totalItem;
                for (var i = 0; i < PutAwayConfirmationSRV.itemListObj.list.length; i++) {
                    $scope.itemCodeList.push(PutAwayConfirmationSRV.itemListObj.list[i]);
                }
                $scope.moreDataCanBeLoaded = PutAwayConfirmationSRV.itemListObj.canNext;
            }, function (err) {
                console.log(err);
                page--
                $scope.moreDataCanBeLoaded = false;
                LoadingService.PopAlert("Something went wrong", "" + err.data.ExceptionMessage + " Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
                $timeout(function () { $scope.moreDataCanBeLoaded = currentCanBeLoaded }, 1000);
            }).finally(function () {
                LoadingService.StopLoading();
                $scope.$broadcast('scroll.infiniteScrollComplete');
                $scope.$broadcast('scroll.refreshComplete');
            })*/
    }
    
    $scope.loadMore = function (param) {
        console.log("apram is :" + param);
        page++;
        $scope.GetViews(param, page);
    };
    
    $scope.setItemMaster = function (BatchNo) {
        console.log(BatchNo);
        $scope.itemMaster = _.findWhere($scope.itemCodeList, { BatchNo: BatchNo });
        $scope.barcodesetupmodal.show();
    
    }
    
    $scope.SearchBatchNumber = function () {//for searching
        $cordovaBarcodeScanner.scan().then(function (data) {
            if (!data.cancelled) {
                $scope.searchParam = data.text;
                $scope.itemMaster.NewCode = data.text;
                $scope.setItemMaster(data.text);
                $scope.barcodesetupmodal.show();
            }
        }, function (err) {
            LoadingService.PopAlert("Something went wrong", err.data);
        })
    }
    
    $scope.ScanBarcode = function () {//for updating bar code
        $cordovaBarcodeScanner.scan().then(function (data) {
            if (!data.cancelled) {
                $scope.itemMaster.NewCode = data.text;
                $scope.setItemMaster(data.text);
                $scope.barcodesetupmodal.show();
    
            }
        }, function (err) {
            LoadingService.PopAlert("Something went wrong", err.data);
        })
    }
    
    $scope.ImageUpdate = function (item) {
        console.log(item);
        var confirmPopup = $ionicPopup.confirm({
            title: 'Are you sure to Confirm?',
            subTitle: 'Stock Transfer Confirmation Batch Number : '+item.BatchNo,
          });
          confirmPopup.then(function(res) {
            if(res) {
    
                $scope.GetAutoPutAwayConfirmation(item);
    
            } else {
                    
            }
          });
      
    }
    
    
    $scope.GetAutoPutAwayConfirmation = function (item) {
        LoadingService.StartLoading();
        
        StockTransferSrv.GetStockTransferConfirmation(item.BatchNo,item.WarehouseCode,item.TransactionCode,item.CreatedBy)
            .then(function (res) {
                //LoginService.ResetSearchList();
                $scope.barcodesetupmodal.hide();
                   // $scope.itemCodeList = [];
                   // page = 1;
                    $cordovaToast.show(res.data, 'short', 'bottom');
                    $scope.init();
                   // $scope.GetViews('', page);  
                    
            }, function (err) {
                LoadingService.PopAlert("Something went wrong", "" + err.data + " Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
                LoadingService.StopLoading();
            }).finally(function () {
                LoadingService.StopLoading();
                $scope.$broadcast('scroll.infiniteScrollComplete');
                $scope.$broadcast('scroll.refreshComplete');
            })
    
    }
    
    
    $scope.ResetItemList = function () {
        $scope.itemCodeList = [];
    }
    
    $scope.redirectme = function (itm) {
        if($scope.Scanshow()){
            $scope.ScanLocation();
        }else{
            $scope.ImageUpdate(itm);  
        }
        //$state.go('app.iteminventory', { itemcode: $scope.itemMaster.ItemCode });
        //$scope.barcodesetupmodal.hide();
    }
    
    
    $ionicModal.fromTemplateUrl('templates/barcodesetupmodal.html', {
        id: 'barcodesetupmodal',
        scope: $scope
    }).then(function (modal) {
        $scope.barcodesetupmodal = modal;
    });
    
    
    
    
         
    
        $scope.init();
    }]);
