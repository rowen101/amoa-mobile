//PickList Controller
app.controller('CheckerIssuanceItemListCtrl', ['$scope', 'OrderCheckingService', '$state', '$rootScope', '$ionicHistory', 'LoadingService', '$cordovaBarcodeScanner','LoginService',
function ($scope, OrderCheckingService, $state, $rootScope, $ionicHistory, LoadingService, $cordovaBarcodeScanner, LoginService) {
    $scope.init = function () {
        LoadingService.StartLoading();
        $scope.GetCheckIssuanceItemList();
        $scope.wc = LoginService.userProfile.warehouseCode;
        $scope.issuanceNo = OrderCheckingService.issuanceNo;
    }

    $scope.GetCheckIssuanceItemList = function () {
        OrderCheckingService.GetCheckIssuanceItemList()
            .then(function (res) {
                $scope.ItemList = OrderCheckingService.ItemList;
             if ($scope.ItemList.length === 0) {
                    $state.go('app.2017072710052679');
                }
            }, function (err) {
                LoadingService.PopAlert("Something went wrong","Error Message: "+err.data+ " Sorry we cant get the item in picklist of Warehouse '" + $scope.wc + "'. Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
            }).finally(function () {
                LoadingService.StopLoading();
                $scope.$broadcast('scroll.refreshComplete');
            });
    }

    $scope.redirectMe = function (itemcode) {
        OrderCheckingService.itemCode = itemcode;
        $state.go('app.checkerissuancepalletelist');
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
