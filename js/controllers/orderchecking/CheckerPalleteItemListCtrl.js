//PickList Controller
app.controller('CheckerPalleteItemListCtrl', ['$scope', 'OrderCheckingService', '$state', '$rootScope', '$ionicHistory', 'LoadingService', '$cordovaBarcodeScanner','LoginService',
function ($scope, OrderCheckingService, $state, $rootScope, $ionicHistory, LoadingService, $cordovaBarcodeScanner, LoginService) {
    $scope.init = function () {
        LoadingService.StartLoading();
        $scope.getPalleteItemList();
        $scope.wc = LoginService.userProfile.warehouseCode;
        $scope.pickid = OrderCheckingService.pickid;
    }

    $scope.getPalleteItemList = function () {
        OrderCheckingService.getPalleteItemList()
            .then(function (res) {
                $scope.ItemList = OrderCheckingService.ItemList;
             if ($scope.ItemList.length === 0) {
                    $state.go('app.2017072710045099');
                }
            }, function (err) {
                LoadingService.PopAlert("Something went wrong", "Error Message: "+err.data+ " Sorry we cant get the item in picklist of Warehouse '" + $scope.wc + "'. Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
            }).finally(function () {
                LoadingService.StopLoading();
                $scope.$broadcast('scroll.refreshComplete');
            });
    }

    $scope.redirectMe = function (itemcode) {
        // $rootScope.pickid = pickid;
        OrderCheckingService.itemCode = itemcode;
        $state.go('app.checkerpalletelist');
    }
    
    
    $scope.ScanBarcode = function(){
        $cordovaBarcodeScanner.scan().then(function(data){
        if(!data.cancelled)
        {
            $scope.searchPickList = data.text;
        } 
        },function(err){
            LoadingService.PopAlert("Something went wrong", err.data);
        })
    }


     $scope.goBack = function(){
      LoadingService.GoBack();
    }

    $scope.init();
}]);
