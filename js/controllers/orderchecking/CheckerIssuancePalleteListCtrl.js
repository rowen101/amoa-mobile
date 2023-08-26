
//Issuance PalleteList Controller
app.controller('CheckerIssuancePalleteListCtrl', ['$scope', 'OrderCheckingService', '$state', '$rootScope', '$ionicModal', 'LoadingService', '$cordovaToast', '$cordovaBarcodeScanner',
 function ($scope, OrderCheckingService, $state, $rootScope, $ionicModal, LoadingService, $cordovaToast, $cordovaBarcodeScanner) {
    $scope.init = function () {
        LoadingService.StartLoading();
        $scope.itemCode = OrderCheckingService.itemCode;
        $scope.GetIRToCheck();
        $scope.pickDetail = {};
        $scope.filter = {};
        $scope.filter.qty = false;
        $scope.filter.lot = true;
    }
    
    


    //for modal
    $ionicModal.fromTemplateUrl('templates/checkerMoreInfoModal.html', {
        id: 'checkerMoreInfoModal',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.moreInfoModal = modal;
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


    //close modal
    $scope.closeModal = function (modal) {
        if (modal == 'PickModal') {
            //$scope.pickItemModal.hide();
        }
        else if (modal == 'MoreInfo') {
            $scope.moreInfoModal.hide();
        }
    }

    $scope.GetIRToCheck = function () {
         LoadingService.StartLoading();
         OrderCheckingService.GetIRToCheck()
            .then(function (res) {
                $scope.PalleteList = OrderCheckingService.IssuancePalleteList;
                console.log($scope.PalleteList);
                if ($scope.PalleteList.length === 0) {
                    $state.go('app.checkerissuanceitemlist');
                }
            }, function (err) {
                LoadingService.PopAlert("Something went wrong", "Error Message: "+err.data+ " Sorry we cant get the Pallete-list of Picklist '" + $scope.pickid + "'. Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
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
        
        OrderCheckingService.CheckItem(palnum, $scope.pickDetail.lot, qtyLeft)
            .then(function (res) {
                $scope.moreInfoModal.hide();
                $scope.pickDetail = {};
                console.log('Sucessfully tirggered stored proc');
                $scope.GetIRToCheck();
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