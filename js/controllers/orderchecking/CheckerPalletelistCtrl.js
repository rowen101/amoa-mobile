//Pallete Controller
app.controller('CheckerPalletelistCtrl', ['$scope', 'OrderCheckingService', '$state', '$rootScope', '$ionicModal', '$ionicHistory', 'LoadingService', '$ionicSideMenuDelegate','$cordovaToast', '$cordovaBarcodeScanner',
function ($scope, OrderCheckingService, $state, $rootScope, $ionicModal, $ionicHistory, LoadingService,$ionicSideMenuDelegate, $cordovaToast, $cordovaBarcodeScanner) {

    $scope.init = function () {
        console.log("init");
        // $scope.pickid = $rootScope.pickid;
        $scope.pickid = OrderCheckingService.pickid;
        $scope.getPalleteList();
        $scope.pickDetail = {};
        $scope.filter = {};
        $scope.filter.lot = true;
        
//    $ionicSideMenuDelegate.canDragContent(false);
    };



    //Functions

    //for modal
    $ionicModal.fromTemplateUrl('templates/checkerMoreInfoModal.html', {
        id: 'checkerMoreInfoModal',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.moreInfoModal = modal;
    });

   /* $ionicModal.fromTemplateUrl('templates/pickItemModal.html', {
        id: 'pickItemModal',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.pickItemModal = modal;
    });*/

    $scope.showMoreInfoModal = function (palnum) {
        try {
            console.log(palnum);
            $scope.moreInfoModal.show();
            $scope.pickedItem = _.findWhere($scope.PalleteList, { 'PalleteNo': palnum });
            console.log($scope.pickedItem);
        }
        catch (err) {
            console.log(err.message);
        }
    }

   /* $scope.showPickItemModal = function (palnum) {
        try {
            $scope.pickDetail.qty = "";
            $scope.pickDetail.lot = "";
            $scope.pickItemModal.show();
            $scope.pickedItem = _.findWhere($scope.PalleteList, { 'PalleteNo': palnum });
            console.log($scope.pickedItem);
        }
        catch (err) {
            console.log(err.message);
        }
    }*/

    //close modal
    $scope.closeModal = function (modal) {
        if (modal == 'PickModal') {
            /*$scope.pickItemModal.hide();*/
        }
        else if (modal == 'MoreInfo') {
            $scope.moreInfoModal.hide();
        }
    }

    $scope.getPalleteList = function () {
         LoadingService.StartLoading();
         OrderCheckingService.getPalleteList()
            .then(function (res) {
                $scope.PalleteList = OrderCheckingService.PalleteList;
                console.log($scope.PalleteList);
                  if ($scope.PalleteList.length === 0) {
                    $state.go('app.checkerpalleteitemlist');
                }
            }, function (err) {
                //err
                LoadingService.PopAlert("Something went wrong", "Error Message: "+err.data+" Sorry we cant get the Pallete-list of Picklist '" + $scope.pickid + "'. Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
            }).finally(function () {
                LoadingService.StopLoading();
                $scope.$broadcast('scroll.refreshComplete');
            })
    }



  /*  $scope.PickAll = function (palnum) {
        LoadingService.StartLoading();
        PickListService.PickItem(palnum, '', 0)
            .then(function (res) {
                console.log('Successfully Stored Proc item');
                $scope.getPalleteList();
                $cordovaToast.show(res.data, 'short', 'bottom');
            }, function (err) {
                LoadingService.PopAlert('Something went wrong', err.data);
            }).finally(function () {
                LoadingService.StopLoading();
                $scope.$broadcast('scroll.refreshComplete');
            })
    }*/

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
                /*$scope.pickItemModal.hide();*/
                $scope.getPalleteList();
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