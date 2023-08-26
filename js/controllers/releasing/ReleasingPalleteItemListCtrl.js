//PickList Controller
app.controller('OrderReleasePalleteItemListCtrl', ['$scope', 'OrderReleaseService', '$state', '$rootScope', '$ionicHistory', 'LoadingService', '$cordovaBarcodeScanner','LoginService',
function ($scope, OrderReleaseService, $state, $rootScope, $ionicHistory, LoadingService, $cordovaBarcodeScanner, LoginService) {
    $scope.init = function () {
        LoadingService.StartLoading();
        $scope.getPalleteItemList();
        $scope.wc = LoginService.userProfile.warehouseCode;
        $scope.pickid = OrderReleaseService.pickid;
    }

    $scope.getPalleteItemList = function () {
        OrderReleaseService.getPalleteItemList()
            .then(function (res) {
                $scope.ItemList = OrderReleaseService.ItemList;
             if ($scope.ItemList.length === 0) {
                    $state.go('app.636835634628185842');
                }
            }, function (err) {
                LoadingService.PopAlert("Something went wrong","Error Message: "+err.data+ " Sorry we cant get the item in picklist of Warehouse '" + $scope.wc + "'. Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
            }).finally(function () {
                LoadingService.StopLoading();
                $scope.$broadcast('scroll.refreshComplete');
            });
    }

    $scope.redirectMe = function (itemcode) {
        // $rootScope.pickid = pickid;
        OrderReleaseService.itemCode = itemcode;
        $state.go('app.orderreleasepalletelist');
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
