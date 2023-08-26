//Issuance PalleteList Controller
app.controller('ItemPickIssuancePalleteListCtrl', ['$scope','LoginService', '$state', '$rootScope','$ionicPopup', '$ionicModal', 'LoadingService', '$cordovaToast', '$cordovaBarcodeScanner','ItemPickingService','LoginService',
 function ($scope,LoginService, $state, $rootScope,$ionicPopup, $ionicModal, LoadingService, $cordovaToast, $cordovaBarcodeScanner,ItemPickingService,LoginService) {
    $scope.init = function () {
        LoadingService.StartLoading();
        // $scope.pickid = $rootScope.IssuancePickId;
        $scope.issuanceNo =   ItemPickingService.issuanceNo;
        $scope.IRItemCode = ItemPickingService.IRItemCode
        $scope.getIssuancePalleteList();
        $scope.pickDetail = {};
        $scope.filter = {};
        $scope.filter.lot = true;
        $scope.userrole = LoginService.getProfile().userrole;
      
    }

    //Access of Scan

    $scope.Scanshow = function(){

        if($rootScope.scanpicking.length === 0){
            return false;
                }else{
                    var ans = _.findWhere($rootScope.scanpicking, { stage: "637470112926592594" });        
                    if (ans) {
                      return true;
                    } else {
                      return false;
                    }
                }

   
    }

  



    $scope.ScanLocation = function (itm) {
        $cordovaBarcodeScanner.scan().then(function (data) {
            if (!data.cancelled) {
                if(itm.LocationCode = data.text){
                    $scope.PickItem(itm.PalleteNo);
                }else{
                    LoadingService.PopAlert("Invalid Location Barcode");
                }
                
            }
        }, function (err) {
            LoadingService.PopAlert("Cannot scan barcode", err.data);
        })
    }





    //for modal
    $ionicModal.fromTemplateUrl('templates/moreInfoModal.html', {
        id: 'moreInfoModal',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.moreInfoModal = modal;
    });

    $ionicModal.fromTemplateUrl('templates/pickItemModal.html', {
        id: 'pickItemModal',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.pickItemModal = modal;
    });

    $scope.showMoreInfoModal = function (palnum) {
        try {
            $scope.moreInfoModal.show();
            $scope.pickedItem = _.findWhere($scope.PalleteList, { 'PalleteNo': palnum });
            console.log($scope.pickedItem);
        }
        catch (Err) {
            console.log(err.message);
        }
    }

    $scope.showPickItemModal = function (palnum) {
        try {
            $scope.pickDetail.qty = "";
            $scope.pickDetail.lot = "";
            $scope.pickItemModal.show();
            $scope.pickedItem = _.findWhere($scope.PalleteList, { 'PalleteNo': palnum });
            console.log("$scope.pickedItem: "+$scope.pickedItem);
        }
        catch (err) {
            console.log(err.message);
        }
    }

    //close modal
    $scope.closeModal = function (modal) {
        if (modal == 'PickModal') {
            $scope.pickItemModal.hide();
        }
        else if (modal == 'MoreInfo') {
            $scope.moreInfoModal.hide();
        }
    }

    $scope.getIssuancePalleteList = function () {
        ItemPickingService.GetIRToPick($scope.issuanceNo,$scope.IRItemCode,LoginService.userProfile.warehouseCode)
            .then(function (res) {
                $scope.PalleteList =  ItemPickingService.irToPick;
                console.log($scope.PalleteList);
                if ($scope.PalleteList.length === 0) {
                    $state.go('app.636385913371875412');
                }
            }, function (err) {
                LoadingService.PopAlert("Something went wrong","Error Message: "+err.data+ " Sorry we cant get the Pallete-list of Picklist '" + $scope.pickid + "'. Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
            }).finally(function () {
                // Stop the ion-refresher from spinning
                LoadingService.StopLoading();
                $scope.$broadcast('scroll.refreshComplete');
            });


    }

    

    $scope.PickItem = function (palnum) {
        LoadingService.StartLoading();
        if($scope.filter.lot == true){
            $scope.pickDetail.lot = '';
        }
        var  qtyLeft = $scope.filter.qty == true ? 0 : $scope.pickDetail.qty;
        
        ItemPickingService.PickItem(palnum, $scope.pickDetail.lot, qtyLeft)
            .then(function (res) {
                $scope.moreInfoModal.hide();
                $scope.pickDetail = {};
                console.log('Sucessfully tirggered stored proc');
                $scope.pickItemModal.hide();
                $scope.getIssuancePalleteList();
                 $cordovaToast.show(res.data, 'short', 'bottom');
            }, function (err) {
               LoadingService.PopAlert('Something went wrong', err.data);
            }).finally(function () {
                LoadingService.StopLoading();
            });
    }

    
     $scope.ResetFilter = function(){
        $scope.filter = {};
        $scope.filter.qty = false;
        $scope.filter.lot = true;
    }
     
     
     $scope.ScanBarcode = function(){
        $cordovaBarcodeScanner.scan().then(function(data){
        if(!data.cancelled)
        {
            $scope.searchPalleteList = data.text;
        } 
        },function(err){
            LoadingService.PopAlert("Something went wrong", err.data);
        })
    }

    $scope.init();
}])