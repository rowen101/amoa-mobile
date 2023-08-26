//ZONE PALLETE LIST
app.controller('ItemPickZonePalleteCtrl', ['$scope', 'ItemPickingService','LoginService', '$state', '$rootScope','$ionicPopup', '$ionicModal', 'LoadingService','$cordovaToast', '$cordovaBarcodeScanner','LoginService',
 function ($scope, ItemPickingService, LoginService, $state, $rootScope,$ionicPopup, $ionicModal, LoadingService,$cordovaToast, $cordovaBarcodeScanner,LoginService) {

    $scope.init = function () {
        LoadingService.StartLoading();
        // $scope.pickid = $rootScope.zonePickId;
        $scope.pickid = ItemPickingService.zonePickId;
        $scope.zone = ItemPickingService.zone;
        $scope.getZonePalleteList();
        // $scope.userid = $rootScope.userid;
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


    //Functions

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
        catch (err) {
            console.log(err.message);
        }
    }

    $scope.showPickItemModal = function (palnum) {
        try {
            $scope.pickDetail.lot = "";
            $scope.pickDetail.qty = "";
            $scope.pickItemModal.show();
            $scope.pickedItem = _.findWhere($scope.PalleteList, { 'PalleteNo': palnum });
            console.log($scope.pickedItem);
        }
        catch (Err) {
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


    $scope.getZonePalleteList = function () {
        ItemPickingService.GetZoneToPick( $scope.zone, $scope.pickid, LoginService.userProfile.warehouseCode)
            .then(function (res) {
                $scope.PalleteList = ItemPickingService.zoneToPick;
                console.log($scope.PalleteList);
                if ($scope.PalleteList.length === 0) {
                  $state.go('app.itempickzonepicklist');
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
                $scope.getZonePalleteList();
                $cordovaToast.show(res.data, 'short', 'bottom');
            }, function (err) {
                LoadingService.PopAlert('Something went wrong', err.data);
            }).finally(function(){
                LoadingService.StopLoading();
            })
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